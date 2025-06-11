'use client'


import { Component } from "@/types";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import SortableItem, { RenderComponent } from "./SortableItem";
import { useEffect, useState } from "react";



export default function Editor({component,setComponents,selectedId,setSelectedId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
}){

  const [hydrated,setHydrated]=useState(false);
  
  useEffect(
    ()=>{
      setHydrated(true);
    }
    ,[])

  function AddComponent(newComponent){
    setComponents([...component,newComponent]);
  }

  function reorderComponent(oldindex,newIndex){
    const newComp  =[...component];
    const [moved] = newComp.splice(oldindex,1);
    newComp.splice(newIndex,0,moved);

    setComponents(newComp);
  }

  const root = component.find(c => c.id === "_body");

  if(!root)
  return(
    <div>
      Root not found
    </div>
  )


  const activeComponent = component.find((c) => c.id === selectedId);
  const isAbsolute = activeComponent?.style?.position === "absolute";

  if(!hydrated) return null;

  return (
    <div className="h-full flex justify-center">
      <div className="h-full w-65/100 bg-white relative overflow-auto box-content">
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