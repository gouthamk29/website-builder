
import { Component } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"

export default function SortableItem({
  id,
  components,
  selectedId,
  setSelectedId
}:{
  id: string;
  components: Component[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}){

    const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    // border: selectedId === id ? '2px solid blue' : '1px solid transparent'
  };

   return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RenderComponent
        id={id}
        components={components}
        selectedId={selectedId!}
        setSelectedId={setSelectedId}
      />
    </div>
  );  
}




function RenderComponent({ id, components,selectedId }: { id: string; components: Component[],selectedId:string }) {
  
  const {attributes: dragAttributes, listeners, setNodeRef, transform}=useDraggable({
    id:`render-component-${id}`
  })

  const comp = components.find(c => c.id === id);
  if (!comp) return null;

  const { type, attributes, style, content, children_id = [] } = comp;
  const Tag = type as keyof JSX.IntrinsicElements;

  
  const dragStyle  ={
    ...style,
    transform:CSS.Transform.toString(transform),
    outline: selectedId === `render-component-${id}` ? '2px solid blue' : undefined,
  }

  return (
    <Tag ref={setNodeRef} key={id} {...attributes} style={dragStyle} {...listeners} {...dragAttributes}>
      {content}
      {children_id.map(childId => (
        <RenderComponent key={childId} id={childId} components={components} selectedId={selectedId}/>
      ))}
    </Tag>
  );
}
