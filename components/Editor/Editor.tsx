'use client'
import { Component } from "@/types";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"
import { Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { EditorContext } from "@/app/projects/[projectId]/editor/page";
import cx  from "classnames";
import { CircleX, X } from "lucide-react";
import { getComponentById } from "@/helpers/componentUtilities";


export default function Editor({component,setComponents,selectedId,setSelectedId,overId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
  overId:string | null
}){
  // const {selectedId,setSelectedId} =useContext(EditorContext);
  // console.log(component.find(c => c.id == "_body"))
  const root = component.find(c => c.id === "_body");

  if(!root)
  return(
    <div>
      Root not found
    </div>
  )

  const activeComponent = component.find((c) => c.id === selectedId);

  return (
    <div className="h-full flex justify-center">
      <div className="flex-1 w-3/5 relative">
          <div id="_body" style={root.style} {...root.attributes}>
            {root.content}
            <SortableContext
              items={root.children_id ?? []}
            >
              {(root.children_id ?? []).map((childId) => (
                <SortableItem
                  key={childId}
                  id={childId}
                  components={component}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  overId={overId}       //look into later
                />
              ))}
            </SortableContext>
          </div>
          <PopoverEditorWrapper selectedId={selectedId}/>
          
      </div>
      </div>
     
  );
}


function PopoverEditorWrapper({ selectedId }: { selectedId: string | null }) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const [toggle,setToggle] = useState(true);



  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("Ctx missing");

  const { getRect } = ctx;

  useEffect(()=>{
    setToggle(true)
  },[selectedId])

  useLayoutEffect(() => {
    if (!selectedId || !popoverRef.current) {
      setPosition(null);
      return;
    }

    const rect = getRect(selectedId);
    if (!rect) return;

    const popoverRect = popoverRef.current.getBoundingClientRect();
    const popoverWidth = popoverRect.width;
    const popoverHeight = popoverRect.height;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const OFFSET_X = 16;
    const OFFSET_Y = 8;
    const EDGE_PADDING = 12;

    // Default: below + right
    let left = rect.left + scrollX + OFFSET_X;
    let top = rect.bottom + scrollY + OFFSET_Y;

    // Flip horizontally if overflowing right
    if (
      left + popoverWidth + EDGE_PADDING >
      window.innerWidth + scrollX
    ) {
      left =
        rect.right +
        scrollX -
        popoverWidth -
        OFFSET_X;
    }

    // Flip vertically if overflowing bottom
    if (
      top + popoverHeight + EDGE_PADDING >
      window.innerHeight + scrollY
    ) {
      top =
        rect.top +
        scrollY -
        popoverHeight -
        OFFSET_Y;
    }

    // Final clamp (absolute safety)
    left = Math.max(
      scrollX + EDGE_PADDING,
      Math.min(
        left,
        window.innerWidth + scrollX - popoverWidth - EDGE_PADDING
      )
    );

    top = Math.max(
      scrollY + EDGE_PADDING,
      Math.min(
        top,
        window.innerHeight + scrollY - popoverHeight - EDGE_PADDING
      )
    );

    setPosition({ left, top });
  }, [selectedId, getRect]);

  if (!selectedId) return null;

  return (
    <div
      ref={popoverRef}
      className={cx(
        "absolute z-[999] ",
      )}
      style={
        {

          ...(position
          ? { left: position.left, top: position.top }
          : { visibility: "hidden" }),
          display:toggle?"block":"none"
        }
      }
    >
      
      <PopoverEditor toggle={toggle} setToggle={setToggle} />
    </div>
  );
}


function PopoverEditor({toggle,setToggle}){

  const ctx =useContext(EditorContext);
  if(!ctx) throw new Error ("Context not found")

    const {selectedId,setComponents,components} =ctx; 
    if(selectedId===null) return  

  const selectedComponent:Component|null = getComponentById(selectedId,components)!;

  if(selectedComponent==null) return null;


  console.log(selectedId,selectedComponent.style.color)

  return <div className="flex flex-col gap-2 bg-gray-700 opacity-95 py-0.5 px-1 rounded shadow">
    
    <div className="mt-1 rounded flex w-full justify-between items-center bg-gray-500 py-1">
      <div className="p-0.5 mx-1">{selectedComponent.type}</div>
      <button onClick={()=>setToggle(false)} className="p-0.5 mx-1 rounded bg-gray-600 hover:bg-gray-700 "><X color="white" strokeWidth={1.4} size={'22px'}/></button>
    </div>
    
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between">
        <div>Size</div>
        <div className="bg-gray-200 rounded text-black">{}</div>
      </div>
      <div className="flex gap-2 justify-between">
        <div>Color</div>
        <div className="bg-gray-200 rounded text-black">{selectedComponent.style.color||"black"}</div>
      </div>
    </div>

    

  </div>
  
}