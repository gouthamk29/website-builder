'use client'
import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import { useEffect, useState } from "react";
 type ElementProps = {
  elementType: string;
  elementName: string;
};

export function AddComponentElements({ elementType,elementName }: ElementProps) {

  const [isMounted,setIsMounted] = useState(false);


  useEffect(()=>{
    setIsMounted(true);
  },[])

  
  const {attributes, listeners, setNodeRef, transform}=useDraggable({
    id:`add-elements-${elementType}`,
    data:{
      from:"add-element-component",
      elementType:elementType,
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
    <div onClick={(e)=>e.stopPropagation()} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {elementName}
    </div>
  );
}

