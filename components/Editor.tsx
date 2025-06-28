'use client'

import { Component } from "@/types";
import { DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import SortableItem, { RenderComponent } from "./SortableItem";
import { useEffect, useState } from "react";



export default function Editor({component,setComponents,selectedId,setSelectedId,overId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
  overId: string | null}
){

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

  // function handleDrop(event:DragEvent){
  //   console.log("dragged");
  // }


  if(!hydrated) return null;

  return (
    <div className="h-full flex justify-center">
      <div className="h-full w-65/100 bg-white relative overflow-auto box-content">
       <RenderComponent id="_body" components={component} overId={overId} />
      </div>
    </div>
  );
}


function DroppableWrapper({ id, children,overId }: { id: string, children: React.ReactNode;overId: string | null; }) {
  const { setNodeRef } = useDroppable({ id });

  console.log(`DroppableWrapper ${id}`,overId,id)

  const isOver = overId === id;
  return (
    <div
      ref={setNodeRef}
      style={{
        outline: isOver ? '2px dashed red' : undefined,
        minHeight: 20,
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}


function RenderComponent({ id, components,overId }: { id: string; components: Component[];overId: string | null; }) {
  const comp = components.find(c => c.id === id);
  if (!comp) return null;

  const { type, attributes, style, content, children_id = [] } = comp;
  const Tag = type as keyof JSX.IntrinsicElements;

  return (
      <DroppableWrapper id={id} overId={overId}>
        <Tag key={id} {...attributes} style={style}>
          {content}
          {children_id.map(childId => (
            <RenderComponent key={childId} id={childId}  overId={overId} components={components} />
          ))}
        </Tag>
      </DroppableWrapper>
  );
}