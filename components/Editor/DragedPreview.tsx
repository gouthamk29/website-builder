'use client'
import React from "react"

export default function DragedPreview({ draggedElement }: { draggedElement: any }) {
  if (!draggedElement) return null;
  console.log("Dragged Element",draggedElement)
  if (typeof draggedElement === "string") {
    return (
      <div className="opacity-80 border-2 border-dashed border-blue-400 bg-green-500 px-4 py-2 rounded flex justify-center items-center">
        <div>
          <span className="min-h-[20px] min-w-[40px] px-4">{`${draggedElement.toString()}`}</span>
        </div>
      </div>
    );
  }

  if (typeof draggedElement === "function" || typeof draggedElement === "object") {
    const Component = draggedElement as React.ElementType;
    return (
      <div className="opacity-70">
        <Component />
      </div>
    );
  }

  return null;
}
