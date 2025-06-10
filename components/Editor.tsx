'use client'


import { Component } from "@/types";




export default function Editor({component,setComponents,selectedId,setSelectedId}:{
  component:Component[],
  setComponents:Dispatch<SetStateAction<Component[]>>,
  selectedId:string | null,
  setSelectedId:Dispatch<SetStateAction<string | null>>,
}){



  function AddComponent(newComponent){
    setComponents([...component,newComponent]);
  }

  function reorderComponent(oldindex,newIndex){
    const newComp  =[...component];
    const [moved] = newComp.splice(oldindex,1);
    newComp.splice(newIndex,0,moved);

    setComponents(newComp);
  }





  return (
    <div className="h-full flex justify-center">
      <div className="h-full w-65/100 bg-white relative overflow-auto box-content">
       <RenderComponent id="_body" components={component} />
      </div>
    </div>
  );
}


function RenderComponent({ id, components }: { id: string; components: Component[] }) {
  const comp = components.find(c => c.id === id);
  if (!comp) return null;

  const { type, attributes, style, content, children_id = [] } = comp;
  const Tag = type as keyof JSX.IntrinsicElements;

  return (
    <Tag key={id} {...attributes} style={style}>
      {content}
      {children_id.map(childId => (
        <RenderComponent key={childId} id={childId} components={components} />
      ))}
    </Tag>
  );
}