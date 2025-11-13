'use client'
import { Component } from "@/types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { primitiveComponentTypes, secondaryComponentTypes } from "@/helpers/componentType";

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
  setSelectedId: Dispatch<SetStateAction<string | null>>
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

export function RenderComponent({ id, components,selectedId,setSelectedId,overId }: { id: string; components: Component[],selectedId:string, overId: string | null;setSelectedId:Dispatch<SetStateAction<string | null>> }) {
  

  
  const comp = components.find(c => c.id === id);
  
  
  // const draggable = useDraggable({id});
  const sortable = useSortable(
    {
      id,
      data:{
        type:`sortable-element`,
        componentType:comp?.type,
        component:comp,
      }
    }
  );
  const [isMount,setIsMount]= useState(false);

  
  
  useEffect(()=>{
    setIsMount(true);
  },[])

  if(!isMount){
    return null;
  }
  
  if (!comp) return null;

  const isAbsolute = comp.style?.position === 'absolute';

const {
    attributes: dragAttributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging
  } = sortable;

    const mergedRef = (el: HTMLElement | null) => {
    setDragRef(el);
    
  };

  const { type, attributes, style, content, children_id = [] } = comp;
  

  
  const dragStyle  ={
    ...style,
    transform:CSS.Transform.toString(transform),
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging && isAbsolute ? 999 : comp.style?.zIndex || "auto",
    outline:
          overId === id
        ? "2px dashed red"
        : selectedId === id
        ? "2px solid blue"
        : undefined,
  }

  const Tag =type as unknown as React.ElementType;

   const isContainer = secondaryComponentTypes.includes(type);
  const isPrimitive = primitiveComponentTypes.includes(type);

  return (
    <Tag ref={mergedRef} key={id} {...attributes} style={dragStyle} {...listeners} {...dragAttributes}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedId(id);
      }}
    >
      {content}
      {children_id.length > 0 && !isAbsolute && isContainer && (
        <SortableContext items={children_id}>
          {children_id.map((childId) => (
            <SortableItem
              key={childId}
              id={childId}
              components={components}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              overId={null}
            />
          ))}
        </SortableContext>
      )}

      {children_id.length > 0 && !isAbsolute && isPrimitive && (
          <>
            {children_id.map((childId) => (
              <SortableItem
                key={childId}
                id={childId}
                components={components}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                overId={null}
              />
            ))}
          </>
      )}
    </Tag>
  )
}
