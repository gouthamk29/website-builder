'use client'
import { useState,useRef,useContext,useEffect,useLayoutEffect } from "react";
import { EditorContext } from "@/app/projects/[projectId]/editor/page";
import { Component } from "@/types";
import { getComponentById } from "@/helpers/componentUtilities";
import cx from 'classnames'
import { CircleX, X } from "lucide-react";
import { validateHeaderName } from "http";
import { componentUpdate } from "./componentUpdate";
import { access } from "fs";
export function PopoverEditorWrapper({ selectedId }: { selectedId: string | null }) {
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







export function PopoverEditor({toggle,setToggle}){

  
  
  const ctx =useContext(EditorContext);
  if(!ctx) throw new Error ("Context not found");
    
    const [color,setColor]=useState("");
    const [size,setSize]=useState("");
    
    const {selectedId,setComponents,components} =ctx; 
    if(selectedId===null) return  
    const selectedComponent:Component|null = getComponentById(selectedId,components) || null;
    if(selectedComponent==null) return null;
    
    
    
  function UpdateComponent(change,targerComponent){
    const prop = {
      component:targerComponent,
      action:change.action,
      changes:{
        key:change.key,
        value:change.value
      }
    }
    const updateComponent: Component|null = componentUpdate(prop);
    if(updateComponent==null) return

    const updatedComponents = components.map((component) =>
      component.id === targerComponent.id
        ? {
            ...updateComponent
          }
      : component
    );

    setComponents(
      updatedComponents
    );
  }

  console.log(selectedId,selectedComponent.style.color)

  useEffect(()=>{
    setSize(selectedComponent.style.fontSize?? "");
    setColor(selectedComponent.style.color?? "");
  },[selectedComponent.id])

  return <div className="flex flex-col gap-2 bg-gray-700 opacity-95 py-0.5 px-1 rounded shadow">
    
    <div className="mt-1 rounded flex w-full justify-between items-center bg-gray-500 py-1">
      <div className="p-0.5 mx-1">{selectedComponent.type}</div>
      <button onClick={()=>setToggle(false)} className="p-0.5 mx-1 rounded bg-gray-600 hover:bg-gray-700 "><X color="white" strokeWidth={1.4} size={'22px'}/></button>
    </div>
    
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between">
        <div>Size</div>
        {/* <div className="bg-gray-200 rounded text-black">{selectedComponent.style.fontSize||12}</div> */}
        <input name="fontSize"  className="bg-gray-200 rounded text-black" value={size}
            onChange={(e)=>{
  const value = e.target.value
  setSize(value)

  UpdateComponent(
    {
      action: "style",
      key: "fontSize",
      value,
    },
    selectedComponent
  )
}}
        />
      </div>
      <div className="flex gap-2 justify-between">
        <div>Color</div>
        <input value={color} onChange={(e)=>{
  const value = e.target.value
  setColor(value)

  UpdateComponent(
    {
      action: "style",
      key: "color",
      value,
    },
    selectedComponent
  )
}} className="bg-gray-200 rounded text-black px-2 "/>
      </div>
    </div>
  </div>
  
}