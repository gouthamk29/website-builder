'use client'
import { EditorContext } from "@/app/projects/[projectId]/editor/page";
import React, { useContext } from "react"
import { RenderComponent } from "./SortableItem";

export default function DragedPreview() {
  
  const ctx = useContext(EditorContext);

  if (!ctx) {
  throw new Error("EditorContext must be used within EditorProvider");
}

  const {draggedElement,components,overId,selectedId,setSelectedId} =ctx;
  

  if (!draggedElement) return null;

  return <RenderComponent id={draggedElement} components={components} overId={overId} selectedId={selectedId} setSelectedId={setSelectedId} />

}
