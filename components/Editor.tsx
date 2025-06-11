'use client'


import { Component } from "@/types";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import SortableItem from "./SortableItem";



export default function Editor({component,setComponents,selectedId,setSelectedId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
}){



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
  return (
    <div className="h-full flex justify-center">
      <div className="flex-1 w-3/5 border-red-600 border">

      <SortableContext
        items={component.map(c=>c.id)}
        strategy={verticalListSortingStrategy}
        >
       
         
          <SortableItem
            key={root.id}
            id={root.id}
            components={component}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
       
       <DragOverlay>

       </DragOverlay>
      </SortableContext>
      </div>
     </div>
  );
}
