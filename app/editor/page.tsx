'use client'
import Editor from "@/components/Editor"
import EditorSidebar from "@/components/EditorSidebar"
import { useState } from "react"
import { Component } from "@/types"



import DEVcomponentList from "@/dev-comp/DEVcomponentList"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import DragedPreview from "@/components/DragedPreview"


export default function Page(){
   
   



    const [components,setComponents] =useState<Component[]>(DEVcomponentList) 


    const [selectedId, setSelectedId] = useState<string | null>(null);

    

     
function handleDragEnd(){
    setSelectedId(null);
}

function handleDragStart(event:any){
    console.log(event)
    setSelectedId(event.active.id);
    console.log("dragged",selectedId)
}

    return <div className=" h-full flex relative">
       
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex-1 bg-amber-300 h-full">
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

