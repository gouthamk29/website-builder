// 'use client'
// import { Dispatch, JSX, useState } from "react";

import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

// type ComponentSchema ={
//     id: string;
//     type: string; // "div", "button", etc.
//     content?: string;
//     styles?: Record<string, string>;
//     attributes?: Record<string, string>;
//     children?: ComponentSchema[];
//     customJS?: string;
// }

// const renderComponent = (
//     comp: ComponentSchema,
//     onSelect: (id: string) => void
//   ): JSX.Element => {
//     const Tag = comp.type as keyof JSX.IntrinsicElements;
//     const style = comp.styles || {};
//     const attrs = comp.attributes || {};
//     const children = comp.children || [];
  
//     return (
//       <Tag
//         key={comp.id}
//         style={style}
//         {...attrs}
//         onClick={(e) => {
//           e.stopPropagation(); // avoid canvas-level click
//           onSelect(comp.id);
//         }}
//         className="outline outline-1 outline-transparent hover:outline-blue-500"
//       >
//         {comp.content}
//         {children.map((child) => renderComponent(child, onSelect))}
//       </Tag>
//     );
//   };

// export default function Editor({components,setComponents,selectedId, setSelectedId}:{components:any, setComponents:Dispatch<any>}){
    
   
    
//     return (
//         <>
//        <div className="h-full flex justify-center ">

//         <div
//       className="h-full w-65/100 bg-white relative overflow-auto box-content"
//       onClick={() => setSelectedId(null)} // click outside to deselect
//       >
//       {...components.map((comp) => renderComponent(comp, setSelectedId))}
//           </div>
//         </div>
//         </>
//     )
    
// }


export default function Editor({component,setComponents}:{component:any,setComponents:any}){

  function AddComponent(newComponent){
    setComponents([...component,newComponent]);
  }

  function reorderComponent(oldindex,newIndex){
    const newComp  =[...component];
    const [moved] = newComp.splice(oldindex,1);
    newComp.splice(newIndex,0,moved);

    setComponents(newComp);
  }

  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId,setActiveId] = useState<string | null>(null);

  function handleDragStart(event:any){
    setActiveId(event.active.id);
  }

  function handleDragEnd(event:any){
    const {active,over} = event;
    if(!over){
      setActiveId(null);
      return;
    }

    if(active.data.current && active.data.current.type){

      const newComp = {
        id:`comp-${Math.random()}}`,
        type: active.data.current.type,
        content:
          active.data.current.type === "p"
            ? "New paragraph"
            : active.data.current.type === "div"
            ? ""
            : "",
        styles: { border: "1px solid black", padding: "4px", margin: "4px 0" },
      };
      AddComponent(newComp);
    } else if(active.id !== over.id){
      const oldIndex= component.findIndex((c) => c.id === active.id);
      const newIndex = component.findIndex((c) => c.id === over.id);
      reorderComponent(oldIndex, newIndex);
    }
    setActiveId(null)
  }

  return (
    <div className="h-full flex justify-center">
    <div className="h-full w-65/100 bg-white relative overflow-auto box-content">

     <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      >
      <SortableContext
        items={component.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
        >
        <div
          style={{
            flex: 1,
            padding: 10,
            minHeight: 400,
            backgroundColor: "#f0f0f0",
            overflowY: "auto",
          }}
          >
          {component.map((component) => (
            <SortableComponent key={component.id} component={component} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? <DragPreview id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
          </div>
          </div>
  );
}

function SortableComponent({ component }: { component: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 8,
    margin: "4px 0",
    border: isDragging ? "2px solid blue" : "1px solid gray",
    backgroundColor: "white",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {component.type === "p" && <p>{component.content}</p>}
      {component.type === "div" && <div>{component.content}</div>}
      {component.type === "img" && (
        <img src={component.content || "https://via.placeholder.com/150"} alt="" />
      )}
      {/* Add more rendering as needed */}
    </div>
  );
}

function DragPreview({ id }: { id: string }) {
  // Simple preview box
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: "rgba(0,0,255,0.5)",
        color: "white",
        borderRadius: 4,
      }}
    >
      Dragging: {id}
    </div>
  );