'use client'
import Editor from "@/components/Editor"
import EditorSidebar from "@/components/EditorSidebar"
import { useState } from "react"

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
    const [components,setComponents] =useState<any>([
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
    
    return <div className=" h-full flex ">
        <div className="flex-1 bg-amber-300">
            <Editor components={components} setComponents={setComponents} selectedId={selectedId} setSelectedId={setSelectedId}/>
        </div>
        <div className="absolute right-0 z-1 h-full">
            <EditorSidebar components={components} setComponents={setComponents} selectedId={selectedId} />
        </div>
    </div>

}