'use client'
import Editor from "@/components/Editor"
import EditorSidebar from "@/components/EditorSidebar"
import { useState } from "react"
import { Component } from "@/types"
import { HTML5Backend } from "react-dnd-html5-backend"
import DEVcomponentList from "@/dev-comp/DEVcomponentList"
import { DndProvider } from "react-dnd"

export default function Page(){
   
    const [components,setComponents] =useState<Component[]>(DEVcomponentList) 


    const [selectedId, setSelectedId] = useState<string | null>(null);

    return <div className=" h-full flex relative">
        <DndProvider backend={HTML5Backend}>
            <div className="flex-1 bg-amber-300">
                <Editor component={components} setComponents={setComponents} selectedId={selectedId} setSelectedId={setSelectedId}/>
            </div>
            <div className="absolute right-0 z-1 h-full">
                <EditorSidebar components={components} setComponents={setComponents} selectedId={selectedId} />
            </div>
        </DndProvider>
    </div>
}

