'use client'
import Editor from "@/components/Editor/Editor"
import EditorSidebar from "@/components/Editor/EditorSidebar"
import { useRef, useState } from "react"
import { Component } from "@/types"

import DEVcomponentList from "@/dev-comp/DEVcomponentList"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import DragedPreview from "@/components/Editor/DragedPreview"


export default function Page(){
   
    const [components,setComponents] =useState<Component[]>(DEVcomponentList) 
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const CurrentSelectedId = useRef(null);


function handleDragEnd(){
    // setSelectedId(null);
    // CurrentSelectedId.current = null;
}

function handleDragStart(event:any){
    console.log(event)
    CurrentSelectedId.current = event.active.id;
    setSelectedId(event.active.id);
    console.log("dragged",selectedId,CurrentSelectedId)
}

    return <div className=" h-full flex relative">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex-1 bg-amber-300 h-full px-2 py-2 border-green-300 border-2">
                <Editor component={components} setComponents={setComponents} selectedId={selectedId} setSelectedId={setSelectedId}/>
            </div>
            <div className=" z-1 h-full">
                <EditorSidebar components={components} setComponents={setComponents} selectedId={selectedId} />
            </div>
            {selectedId?.startsWith("add-elements-") && (
          <DragOverlay>
            <DragedPreview />
          </DragOverlay>
        )}
        </DndContext>
    </div>
}

