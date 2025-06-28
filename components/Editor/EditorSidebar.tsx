/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Dispatch, useState, useEffect, SetStateAction, useRef } from "react";
import { Component } from "@/types"; 
import cx  from "classnames";
import { ListCollapse, Pencil, SquarePlus } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { AddComponentElements } from "./AddComponentElements";
import { componentProperty, elementGroups } from "./EditComponent/componentProperties";
import EditComponent from "./EditComponent/EditComponent";

function EditorSidebar({
      selectedId,
      components,
      setComponents,
  }:{
      selectedId: string | null;
      components: Component[];
      setComponents: Dispatch<SetStateAction<Component[]>>;
    }
)
{
  
    const [toggleSidebar,setToggleSidebar] = useState(false);


  return <>

    <div className="h-full relative w-12 bg-white text-black box-border ">

        <div className={cx("absolute right-0 top-0  bottom-0  overflow-hidden flex flex-col gap-4 py-4 transition-all duration-600",
            {
              'w-32':toggleSidebar,
              'w-12':!toggleSidebar,
              'bg-white/20 backdrop-blur-md shadow-lg border border-white/30':toggleSidebar===true,

          }
        )}>


          <div className="">
            <button
              data-tooltip-id="my-tooltip" data-tooltip-content="Toggle Sidebar"
              className="w-full flex justify-center"
              onClick={() => setToggleSidebar((e) => !e)}>
                <ListCollapse/>
            </button>
            <Tooltip id="my-tooltip" place="left-start"/>
          </div>

          <div className="">
              <button
                data-tooltip-id="my-tooltip" data-tooltip-content="Add Component"
                className="w-full flex justify-center anchor-target"
                popoverTarget="add-component" popoverTargetAction="toggle">
                  <SquarePlus/>
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
                  <Pencil/>
              </button>
              <div id="edit-component" popover='auto' role="tooltip" className="side-bar-anchor p-4 mt-2 rounded shadow bg-gray-100 text-black border border-gray-300">
                <EditComponent selectedId={selectedId} components={components} setComponents={setComponents}/>
              </div>
          </div>
          

         

         
        </div>
    </div>
  </>


}
export default EditorSidebar;

function AddComponent(){

  
  return <>
    <div className="my-2 mx-1 ">

      <h1>Add Component</h1>
      <div className="grid grid-rows-2 gap-4 grid-flow-col border p-4 min-w-10 overflow-hidden">  
          <AddComponentElements element="div"/>
          <AddComponentElements element="p"/>
          <AddComponentElements element="images"/>
          <AddComponentElements element="span"/>
      </div>
    </div>
  </>
}



function implementComponentAddition(){
  
}