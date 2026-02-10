'use client'
import { Component } from "@/types";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"
import { Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { EditorContext } from "@/app/projects/[projectId]/editor/page";
import cx  from "classnames";
import { getComponentById } from "@/helpers/componentUtilities";
import { PopoverEditorWrapper } from "./EditComponent/PopoverEditor";


export default function Editor({component,setComponents,selectedId,setSelectedId,overId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
  overId:string | null
}){
  // const {selectedId,setSelectedId} =useContext(EditorContext);
  // console.log(component.find(c => c.id == "_body"))
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
      <div className="flex-1 w-3/5 relative">
          <div id="_body" style={root.style} {...root.attributes}>
            {root.content}
            <SortableContext
              items={root.children_id ?? []}
            >
              {(root.children_id ?? []).map((childId) => (
                <SortableItem
                  key={childId}
                  id={childId}
                  components={component}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  overId={overId}       //look into later
                />
              ))}
            </SortableContext>
          </div>
          <PopoverEditorWrapper selectedId={selectedId}/>
          
      </div>
      </div>
     
  );
}

