'use client'
import Editor from "@/components/Editor"
import EditorSidebar from "@/components/EditorSidebar"
import { useState } from "react"
import { Component } from "@/types"
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
export default function Page(){
    const dummyComponent = [
        {
            id: "comp_123",
            type: "div", // or "button", "input", etc.
            attributes: {
              id: "hero-section"
            },
            styles: {
              width: "100%",
              height: "300px",
              backgroundColor: "lightblue",
              position:'absolute',
             "z-index":"1",
              right:'0',
              top:'1rem',
              margin:'1rem'

            },
            content: "Welcome to my site!",
            children: [],
          
        },
        {
          id:"div-1",
          type: "div",
          styles:{
            backgroundColor:"red",
            margin:'2rem',
            height:'1rem',
            width:'1rem',
            position:'relative',
            "z-index":"2",
          },
          content:"",
          children:[],
        }
    ]
    const [components,setComponents] =useState<Component>([
      {
          id: "comp_123",
          type: "div", // or "button", "input", etc.
          attributes: {
            id: "hero-section"
          },
          styles: {
            width: "100%",
            height: "300px",
            backgroundColor: "lightblue",
            position:'absolute',
           "z-index":"1",
            right:'0',
            top:'1rem',
          },
          content: "Welcome to my site!",
          children: [],
        
      },
      {
        id:"div-1",
        type: "div",
        styles:{
          backgroundColor:"red",
          margin:'2rem',
          height:'1rem',
          width:'1rem',
          position:'relative',
          "z-index":"2",
        },
        content:"",
        children:[],
      }
  ]) 


    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [active,setActive] =useState(null);
    const sensors = useSensors(useSensor(PointerSensor));


    return <div className=" h-full flex relative">
      <DndContext
      sensors={sensors}
      onDragStart={(e) => setActive(e.active)}
      onDragEnd={(e) => {
      setActive(null);
      // …your add-or-reorder logic…
    }}>

        <div className="flex-1 bg-amber-300">
            <Editor component={components} setComponents={setComponents} selectedId={selectedId} setSelectedId={setSelectedId}/>
        </div>
        <div className="absolute right-0 z-1 h-full">
            <EditorSidebar components={components} setComponents={setComponents} selectedId={selectedId} />
        </div>

        <DragOverlay dropAnimation={null}>
      {active ? (
      <SidebarPreview type={active.data.current.type} />
    ) : null}
  </DragOverlay>
      </DndContext>
    </div>

}


type SidebarPreviewProps = {
  type: string;
};

export function SidebarPreview({ type }: SidebarPreviewProps) {
  const styles = {
    padding: "8px 4px",
    background: "white",
    border: "1px solid black",
    borderRadius: "4px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
    // fontSize: "14px",
    color:"black",
    cursor: "grabbing",
    textAlign:"center",
    transtion:"all 0.4s ease-in"
  };

  return <div style={styles}>{type}</div>;
}