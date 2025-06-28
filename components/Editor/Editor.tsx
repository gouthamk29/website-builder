'use client'
import { Component } from "@/types";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import SortableItem, { RenderComponent } from "./SortableItem"



export default function Editor({component,setComponents,selectedId,setSelectedId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
}){

  const root = component.find(c => c.id === "_body");

  if(!root)
  return(
    <div>
      Root not found
    </div>
  )

  const activeComponent = component.find((c) => c.id === selectedId);

  return (
    <div className="h-full flex justify-center">
      <div className="flex-1 w-3/5 border-red-600 border">
      
        <div id="_body" style={root.style} {...root.attributes}>
          {root.content}
          <SortableContext
            items={root.children_id ?? []}
            strategy={verticalListSortingStrategy}
            >
              <SortableItem
                key={root.id}
                id={root.id}
                components={component}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                />
          </SortableContext>
        </div>
      </div>
     </div>
  );
}
