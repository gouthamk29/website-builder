/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Dispatch, useState, useEffect, SetStateAction, useRef, use, ReactNode } from "react";
import { Component } from "@/types"; 
import cx  from "classnames";
import { ChevronFirst, ListCollapse, Pencil, Save, SquarePlus } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { AddComponentElements } from "./AddComponentElements";
import { componentProperty } from "./EditComponent/componentProperties";
import EditComponent from "./EditComponent/EditComponent";
import { useRouter } from "next/navigation";


export const CustomizableComponent  ={
  CONTAINER:["CONTAINER",'div'],
  TEXT:["TEXT",'span'],
  TITLE:["TITLE",'h1'],
  PARAGRAPH:["PARAGRAPH",'p'],
  // VIDEO:["VIDEO",'video'],
  // IMAGES:["IMAGES",'img'],
  // LINK:["LINK",'a']
}


function EditorSidebar({
      projectId,
      selectedId,
      components,
      setComponents,
  }:{
      projectId:string,
      selectedId: string | null;
      components: Component[];
      setComponents: Dispatch<SetStateAction<Component[]>>;
    }
)
{
   
    const [toggleSidebar,setToggleSidebar] = useState(false);
    const router = useRouter();

    async function SaveProject(data){

      console.log(data)
      const req = await fetch(`/api/projects/${projectId}`,
        {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({data})
        }
      )
    }

  return <>

    <div className="h-full relative w-12 bg-white text-black box-border overflow-auto">

        <div className={cx("h-full bottom-0 m-0 overflow-hidden flex flex-col gap-3 py-4 transition-all duration-600",
            {
              'w-32':toggleSidebar,
              'w-12':!toggleSidebar,
              'bg-white/20 backdrop-blur-md shadow-lg border border-white/30':toggleSidebar===true,

          }
        )}>


          {/* <div className="">
             <button
              data-tooltip-id="my-tooltip" data-tooltip-content="Toggle Sidebar"
              className="w-full flex justify-center"
              onClick={() => setToggleSidebar((e) => !e)}>
                <ListCollapse/>
            </button> 
            <Tooltip id="my-tooltip" place="left-start"/>
          </div> */}

          <div className="relative">
            <button
              data-tooltip-id="my-tooltip" data-tooltip-content="return to projects"
              className="w-full flex justify-center"
              data-tooltip-place="left"
              
              onClick={() => router.push('/projects')}
            >
              <IconButton>
                <ChevronFirst/>
              </IconButton>
            </button>
          </div>

        <div className="">
            <button
              data-tooltip-id="my-tooltip" data-tooltip-content="Save project"
              className="w-full flex justify-center"
              onClick={() =>{SaveProject(components)}}
            >
              <IconButton>
                <Save/>
              </IconButton>
            </button>
        </div>

          <div className="">
              <button
                data-tooltip-id="my-tooltip" data-tooltip-content="Add Component"
                className="w-full flex justify-center anchor-target "
                popoverTarget="add-component" popoverTargetAction="toggle">
                <IconButton>
                  <SquarePlus/>
                </IconButton>
              </button>
              <div id="add-component" popover='auto' role="tooltip" className="side-bar-anchor rounded-xl mx-2 my-2">
                <AddComponent/>
              </div>
          </div>

          <div className="">
              <button
                data-tooltip-id="my-tooltip" data-tooltip-content="Edit Component"
                className="w-full flex justify-center anchor-target"
                popoverTarget="edit-component" popoverTargetAction="toggle">
                  <IconButton>
                    <Pencil/>
                  </IconButton>
              </button>
              <div id="edit-component" popover='auto' role="tooltip" className="side-bar-anchor p-4 mt-2 rounded shadow bg-gray-100 text-black border border-gray-300">
                <EditComponent selectedId={selectedId} components={components} setComponents={setComponents}/>
              </div>
          </div> 

          <Tooltip id="my-tooltip"  positionStrategy="fixed"offset={12} delayHide={250}/>
        </div>
    </div>
  </>


}
export default EditorSidebar;

function AddComponent(){

  
  return <>
    <div className="my-2 mx-1 flex flex-col ">
      <h1 className="my-2 text-center font-bold">Add Component</h1>
      <div className="grid grid-rows-2 gap-4 grid-flow-col border p-4 min-w-10 overflow-hidden">  
          <AddComponentElements elementType="div" elementName="Container"/>
          <AddComponentElements elementType="p" elementName="Paragraph"/>
          {/* <AddComponentElements elementType="img" elementName="Images"/> */}
          <AddComponentElements elementType="span" elementName="Text"/>
          {/* <AddComponentElements elementType="video" elementName="video"/> */}
          {/* <AddComponentElements elementType="a" elementName="Link"/> */}
          <AddComponentElements elementType="h1" elementName="Title"/>
      </div>
    </div>
  </>
}

function IconButton({children}:{children:ReactNode}){
    return <div className="bg-gray-200 hover:bg-blue-400 p-2 rounded active:bg-blue-600 hover:text-white">
      {children}
    </div>
}

