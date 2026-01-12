import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useContext } from "react";

interface DragAndDropContextI{
    activeDraggedElement,
    ActiveDropZone,
    selectedItem,
}


function findElementFromComponents(elementId,Components){

}

function getContent(element){

}

function getChilderIdFromComponent(element){

}

function findIsDropableFromActiveDrag(activeDraggedElement,element,ActiveDropZone){

}

function findElementIsDroppable(element){

}

export function RenderElements({elementId}){
    const {activeDraggedElement,ActiveDropZone,selectedItem,Components} = useContext(DragAndDropContext);

    const element=findElementFromComponents(elementId,Components);
    const content =getContent(element);
    const ChildrenElements=getChilderIdFromComponent(element);
    const isDroppableFromActiveDrag:boolean =findIsDropableFromActiveDrag(activeDraggedElement,element,ActiveDropZone);
    const isDroppable:boolean=findElementIsDroppable(element)
    

    //re-look at both droppable and draggable
    const { setNodeRef:setDropRef, isOver, over } = useDroppable({
        id: `bottom-zone-${dropZoneId}`,  
        data: {
        id: `bottom-drop-${dropZoneId}`
        },
        disabled:{isDroppable && isDroppableFromActiveDrag}
    });

    const {
    setNodeRef: setDraggableRef,
    listeners,
    attributes,
    transform,
    isDragging
  } = useDraggable({
    id: `drag-${id}`,
    data: { id }
  });



    return <Tag ref={setDraggableRef} {...attributes} {...listeners}>
                {content}
                {
                    ChildrenElemnt.map(childId=><RenderElements elementId={childId}/>)
                }

                <div ref={setDropRef} className={`
                        ${isOver?'bg-green-400':'bg-gray-300'}
                        ${isDroppableFromActiveDrag?'bg-gray-300':'bg-red-400'}
                        absolute bottom-2 h-4 w-full 
                    `}>

                </div>

            </Tag>
}

