'use client'
import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
// import { forwardRef } from "react";
 type ElementProps = {
  element: string;
};

export function AddComponentElements({ element }: ElementProps) {

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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {element}
    </div>
  );
}


// const AddComponentElements = forwardRef(({children,...props},ref)=>{
//   return (
//     <div {...props} ref={ref}>{children}</div>
//   )
// }
// )

// export default AddComponentElements