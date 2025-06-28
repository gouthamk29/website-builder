'use client'
import { Component } from "@/types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import { JSX, useEffect, useState } from "react";

export default function SortableItem({
  id,
  components,
  selectedId,
  setSelectedId,
  overId
}:{
  id: string;
  components: Component[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  overId:string|null;
}){
   return (

      <RenderComponent
        id={id}
        components={components}
        selectedId={selectedId!}
        setSelectedId={setSelectedId}
        overId={overId}
      />

  );  
}

export function RenderComponent({ id, components,selectedId,setSelectedId,overId }: { id: string; components: Component[],selectedId:string, overId: string | null; }) {
  

  const draggable = useDraggable({id});
  const sortable = useSortable({id});
  const [isMount,setIsMount]= useState(false);

  const { setNodeRef: setDropRef, isOver } = useDroppable({ id });
  
  useEffect(()=>{
    setIsMount(true);
  },[])

  if(!isMount){
      return null;
    }


  const comp = components.find(c => c.id === id);
  if (!comp) return null;

  const isAbsolute = comp.style?.position === 'absolute';

const {
    attributes: dragAttributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging
  } = isAbsolute ? draggable : sortable;

    const mergedRef = (el: HTMLElement | null) => {
    setDragRef(el);
    setDropRef(el);
  };

  const { type, attributes, style, content, children_id = [] } = comp;
  

  
  const dragStyle  ={
    ...style,
    transform:CSS.Transform.toString(transform),
     opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging && isAbsolute ? 999 : comp.style?.zIndex || "auto",
    outline:
      isOver || overId === id
        ? "2px dashed red"
        : selectedId === id
        ? "2px solid blue"
        : undefined,
  }

  const Tag =type as keyof JSX.IntrinsicElements;


  return (
    <Tag ref={mergedRef} key={id} {...attributes} style={dragStyle} {...listeners} {...dragAttributes}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(id);
      }}
    >
      {content}
      {comp.children_id?.length > 0 && !isAbsolute && (
        <SortableContext
          items={comp.children_id}
          strategy={verticalListSortingStrategy}
        >
          {comp.children_id.map(childId => (
            <SortableItem
              key={childId}
              id={childId}
              components={components}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </SortableContext>
      )}

      {comp.children_id?.length > 0 && isAbsolute && (
        <>
          {comp.children_id.map(childId => (
            <SortableItem
              key={childId}
              id={childId}
              components={components}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </>
      )}
    </Tag>
  );
}
