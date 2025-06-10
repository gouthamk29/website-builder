'use client'


import { Component } from "@/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";




export default function Editor({component,setComponents,selectedId,setSelectedId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
}){

  const ref=useRef(null);


  function AddComponent(newComponent){
    setComponents([...component,newComponent]);
  }

  function reorderComponent(oldindex,newIndex){
    const newComp  =[...component];
    const [moved] = newComp.splice(oldindex,1);
    newComp.splice(newIndex,0,moved);

    setComponents(newComp);
  }

  const [{},drop]= useDrop(()=>({
    accept:"div",
    drop:(e)=>AddElementToPage(e),
  }))


  function AddElementToPage(e){
    console.log("dropped",e)
  }

  useEffect(()=>{
     if (ref.current) {
      drop(ref.current);
  }
  },[ref,drop])

  return (
    <div className="h-full flex justify-center">
      <div ref={ref} className="h-full w-65/100 bg-white relative overflow-auto box-content">
       <RenderComponent id="_body" components={component} />
      </div>
    </div>
  );
}


function RenderComponent({ id, components }: { id: string; components: Component[] }) {
  const comp = components.find(c => c.id === id);
  if (!comp) return null;

  const { type, attributes, style, content, children_id = [] } = comp;
  const Tag = type as keyof JSX.IntrinsicElements;

  return (
    <Tag key={id} {...attributes} style={style}>
      {content}
      {children_id.map(childId => (
        <RenderComponent key={childId} id={childId} components={components} />
      ))}
    </Tag>
  );
}