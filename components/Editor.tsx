'use client'
import { Dispatch, JSX, useState } from "react";

type ComponentSchema ={
    id: string;
    type: string; // "div", "button", etc.
    content?: string;
    styles?: Record<string, string>;
    attributes?: Record<string, string>;
    children?: ComponentSchema[];
    customJS?: string;
}

const renderComponent = (
    comp: ComponentSchema,
    onSelect: (id: string) => void
  ): JSX.Element => {
    const Tag = comp.type as keyof JSX.IntrinsicElements;
    const style = comp.styles || {};
    const attrs = comp.attributes || {};
    const children = comp.children || [];
  
    return (
      <Tag
        key={comp.id}
        style={style}
        {...attrs}
        onClick={(e) => {
          e.stopPropagation(); // avoid canvas-level click
          onSelect(comp.id);
        }}
        className="outline outline-1 outline-transparent hover:outline-blue-500"
      >
        {comp.content}
        {children.map((child) => renderComponent(child, onSelect))}
      </Tag>
    );
  };

export default function Editor({components,setComponents,selectedId, setSelectedId}:{components:any, setComponents:Dispatch<any>}){
    
   
    
    return (
        <>
       
        <div
      className="h-full w-full bg-white relative overflow-auto p-4"
      onClick={() => setSelectedId(null)} // click outside to deselect
      >
      {...components.map((comp) => renderComponent(comp, setSelectedId))}
        </div>
        </>
    )
    
}