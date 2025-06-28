'use client'
import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import { useEffect, useState } from "react";
// import { forwardRef } from "react";
 type ElementProps = {
  element: string;
};

export function AddComponentElements({ element }: ElementProps) {

  const [isMounted,setIsMounted] = useState(false);


  useEffect(()=>{
    setIsMounted(true);
  },[])

  
  const {attributes, listeners, setNodeRef, transform}=useDraggable({
    id:`add-elements-${element}`,
    data:{
      elementType:element,
    }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    padding:"0.25rem 1rem",
    border:"2px dashed black"
  };

  if(!isMounted)
    return null;


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {element}
    </div>
  );
}

