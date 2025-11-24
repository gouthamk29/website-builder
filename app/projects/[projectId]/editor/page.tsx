'use client'
import Editor from "@/components/Editor/Editor"
import EditorSidebar from "@/components/Editor/EditorSidebar"
import { use, useEffect, useRef, useState } from "react"
import { Component } from "@/types"

import DEVcomponentList from "@/dev-comp/DEVcomponentList"
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import DragedPreview from "@/components/Editor/DragedPreview"
import { randomUUID } from "crypto"
import { primitiveComponentTypes, secondaryComponentTypes } from "@/helpers/componentType"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import DEVComponentList from "@/dev-comp/DEVcomponentList"


export default function  Page({params}: { params: Promise<{ projectId: string }> }){
  
  const resolvedParams = use(params)
  const projectId = resolvedParams.projectId
  const router = useRouter();
  const [components,setComponents] =useState<Component[]>([]) 
  const [isFetching, setIsFetching] = useState(false);

  const {user,loading}=useAuth();
  
  
  useEffect(()=>{
    if (!loading && !user) {
          router.push("/login");
    }
  }, [loading, user, router]);  
useEffect(() => {
  if (!user || !projectId) return;

  const fetchComponent = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/projects/user/${user._id}/${projectId}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      console.log(data);
      console.log(data.project?.data);
      setComponents(data.project?.data || []);  
      // setComponents(DEVComponentList) // change when done with debug
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  fetchComponent();
}, [user, projectId]); // ✅ remove isFetching

    const [draggedItem,setDraggedItem] = useState(null)
    const [overId, setOverId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const CurrentSelectedId = useRef(null);
    const [draggedElement,setDraggedElement]=useState(null);




function updateComponentList(element: any, parentId: string) {
  setComponents(prev => {
    const newElement = CreateNewElement(element);

    return prev.map(comp => {
      if (comp.id === parentId && Array.isArray(comp.children_id)) {
        return {
          ...comp,
          children_id: [...comp.children_id, newElement.id],
        };
      }
      return comp;
    }).concat(newElement); 
  });
}

function CreateNewElement(element){

  
  const isPrimitive:boolean =primitiveComponentTypes.includes(element)

  const newComponent:Component = {
    id:crypto.randomUUID(),
    type:element,
    attributes:{},
    style:{
    ...(isPrimitiveComponent(element) 
      ? getDefaultPrimitiveStyles(element) 
      : getDefaultSecondaryStyles(element)),
  },
    children_id:isPrimitive?undefined:[],
    content:isPrimitive?`${element} element`:undefined
  }
  return newComponent;
}




function handleDragStart(event:any){
    console.log(event)
    CurrentSelectedId.current = event.active.id;
    setSelectedId(event.active.id);
    console.log("dragged",selectedId,CurrentSelectedId)
    setDraggedItem(event.active.id);
      const elementType = event.active.data.current?.elementType;
    setDraggedElement(elementType)
}


function handleDragOver(event: any) {
    console.log("Dragover",event)
    console.log("DragoverFrom",event.active,event.over)
  if (event.over?.id) {
    console.log("true",event.over.id)
    setOverId(event.over.id);
  } else {
    setOverId(null);
  }
}

function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  console.log("handleDragEnd",active,over)
  if (!over || !active) return;


  const activeId = active.id;
  const overId = over.id;
  console.log("from editorState",activeId,overId)
  // If dropped on a container

   const activeData = active.data.current;
  const overData = over.data.current;


  if (activeData?.from === "add-element-component") {
    const elementType = activeData.elementType;

    setComponents((components) => {
      const newComponents = [...components];
      const overComp = newComponents.find((c) => c.id === overId);
      if (!overComp) {
        setDraggedElement(null)
        return components
      };

      // Find parent (drop zone)
      const dropParentId = overComp.children_id ? overComp.id : overComp.parent_id;
      if (!dropParentId){
        setDraggedElement(null)
        return components
      };

      const parentComp = newComponents.find((c) => c.id === dropParentId);
      if (!parentComp) {
        setDraggedElement(null)
        return components
      };

      const newId = crypto.randomUUID();
      const newElement = {
        id: newId,
        type: elementType,
        content: `${elementType} element`,
        parent_id: dropParentId,
        children_id: [],
      };

      parentComp.children_id = [...(parentComp.children_id || []), newId];
      newComponents.push(newElement);
      setDraggedElement(null)
      return newComponents;
    });
    // setDraggedElement(null)
    return;
  }



  if(active.data.current?.type==="sortable-element" && over.data.current?.type ==="sortable-element"){
    console.log("doing Shift")
    updateComponentByShifting(active.id,over.id);
    setOverId(null);
    setDraggedElement(null)
    setSelectedId(null);
  }

  setDraggedElement(null)
  setOverId(null);
  setSelectedId(null);
}

  function reorderChildrenArray(children: string[], activeId: string, overId: string) {
 
  const oldIndex = children.indexOf(activeId);
  const newIndex = children.indexOf(overId);

  if (oldIndex === -1 || newIndex === -1) return children;

  const newChildren = [...children];
  // Remove activeId from old position
  newChildren.splice(oldIndex, 1);
  // Insert activeId at newIndex
  newChildren.splice(newIndex, 0, activeId);

  return newChildren;
}



function updateComponentByShifting(activeId: string, overId: string) {
  setComponents(prev => {
    const newComponents = prev.map(c => ({ ...c }));

    const activeComp = newComponents.find(c => c.id === activeId);
    const overComp = newComponents.find(c => c.id === overId);
    if (!activeComp || !overComp) return prev;

    const activeParentId = activeComp.parent_id;
   
    const dropParentId = secondaryComponentTypes.includes(overComp.type)
      ? overComp.id
      : overComp.parent_id;

    if (!dropParentId) return prev;
    const dropParent = newComponents.find(c => c.id === dropParentId);
    if (!dropParent) return prev;

    // Remove activeId from old parent
    if (activeParentId) {
      const oldParent = newComponents.find(c => c.id === activeParentId);
      if (oldParent) {
        oldParent.children_id = oldParent.children_id.filter(id => id !== activeId);
      }
    }

    // Insert activeId into new parent's children_id at overId position
    let newChildren = dropParent.children_id.filter(id => id !== activeId);
    const overIndex = newChildren.indexOf(overId);

    if (overIndex === -1) {
      newChildren.push(activeId);
    } else {
      newChildren.splice(overIndex, 0, activeId);
    }

    dropParent.children_id = newChildren;
    activeComp.parent_id = dropParent.id;

    return newComponents;
  });
}


  const sensor = useSensors( useSensor(PointerSensor,{
    activationConstraint:{
      distance:5
    }
  }))

    return <div className=" h-full flex relative">
        
        <DndContext sensors={sensor} onDragStart={handleDragStart}  onDragOver={handleDragOver}  onDragEnd={handleDragEnd}>
            <div className="flex-1 bg-black h-full">
                <Editor component={components} setComponents={setComponents} selectedId={selectedId} setSelectedId={setSelectedId} overId={overId}/>
            </div>
            <div className=" z-1 h-full">
                <EditorSidebar components={components} setComponents={setComponents} selectedId={selectedId} projectId={projectId} />
            </div>
            <DragOverlay>
              {
                selectedId  && <DragedPreview draggedElement={draggedElement}/>
              }
            </DragOverlay>
        </DndContext>
    </div>
}

export function getDefaultSecondaryStyles(type: string): Record<string, string> {
  if (!isSecondaryComponent(type)) return {};

  return {
    margin: "1rem 0",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    border: "1px dashed #ccc",
    minHeight: "50px",
  };
}


export function isPrimitiveComponent(type: string): type is (typeof primitiveComponentTypes)[number] {
  return primitiveComponentTypes.includes(type as any);
}

export function isSecondaryComponent(type: string): type is (typeof secondaryComponentTypes)[number] {
  return secondaryComponentTypes.includes(type as any);
}

export function getDefaultPrimitiveStyles(type: string): Record<string, string> {
  if (!isPrimitiveComponent(type)) return {};

  switch (type) {
    case "img":
      return { width: "100px", height: "auto" };
    case "button":
      return { padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "white", border: "none" };
    case "input":
    case "textarea":
      return { padding: "0.5rem", border: "1px solid #ccc", width: "100%" };
    default:
      return {};
  }
}


