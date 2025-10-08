'use client'
import Editor from "@/components/Editor/Editor"
import EditorSidebar from "@/components/Editor/EditorSidebar"
import { useRef, useState } from "react"
import { Component } from "@/types"

import DEVcomponentList from "@/dev-comp/DEVcomponentList"
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core"
import DragedPreview from "@/components/Editor/DragedPreview"
import { randomUUID } from "crypto"
import { primitiveComponentTypes, secondaryComponentTypes } from "@/helpers/componentType"


export default function Page(){
   
    const [overId, setOverId] = useState<string | null>(null);
    const [components,setComponents] =useState<Component[]>(DEVcomponentList) 
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const CurrentSelectedId = useRef(null);


function handleDragEnd(event:DragEndEvent){
    // setSelectedId(null);
    // CurrentSelectedId.current = null;
    console.log('dragged End');
  
    const { active, over } = event;

  if (!over || !active?.data?.current) return;

  const droppedOnId = over.id; // 👈 This is where it was dropped
  const elementType = active.data.current.elementType as string;

  if (!elementType) return;

  console.log("Dropped:", elementType, "on component with id:", droppedOnId);

  updateComponentList(elementType,droppedOnId);
}

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
}


function handleDragOver(event: any) {
    console.log("Dragover",event)
  if (event.over?.id) {
    console.log("true",event.over.id)
    setOverId(event.over.id);
  } else {
    setOverId(null);
  }
}

    return <div className=" h-full flex relative">
        <DndContext onDragStart={handleDragStart}  onDragOver={handleDragOver}  onDragEnd={handleDragEnd}>
            <div className="flex-1 bg-amber-300 h-full px-2 py-2 border-green-300 border-2">
                <Editor component={components} setComponents={setComponents} selectedId={selectedId} setSelectedId={setSelectedId} overId={overId}/>
            </div>
            <div className=" z-1 h-full">
                <EditorSidebar components={components} setComponents={setComponents} selectedId={selectedId} />
            </div>
            {selectedId?.startsWith("add-elements-") && (
          <DragOverlay>
            <DragedPreview />
          </DragOverlay>
        )}
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

/**
 * Default styles for primitive components
 */
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