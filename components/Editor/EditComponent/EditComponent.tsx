'use client'

import { Component } from "@/types";
import { componentProperty } from "./componentProperties";
import { useEffect, useState } from "react";

export default function EditComponent({
  selectedId,
  components,
  setComponents,
}: {
  selectedId: any;
  components: Component[];
  setComponents: (components: Component[]) => void;
}) {
  const selectedComponent: Component | undefined = components.find((c) => c.id === selectedId);
  const [appliedStyle, setAppliedStyle] = useState<Record<string, string>>({});

  // Reset applied styles when selection changes
  useEffect(() => {
    if (!selectedComponent) {
      setAppliedStyle({});
      return;
    }

    const el = document.createElement(selectedComponent.type);
    document.body.appendChild(el);
    const styles = window.getComputedStyle(el);

    const newStyles: Record<string, string> = {};
    const propList = componentProperty[selectedComponent.type]?.basic || [];

    propList.forEach((prop) => {
      const fromStyle = selectedComponent.style?.[prop];
      const computed = styles.getPropertyValue(prop);
      newStyles[prop] = fromStyle || computed;
    });

    document.body.removeChild(el);
    setAppliedStyle(newStyles);
  }, [selectedId,selectedComponent]);

  if (!selectedComponent) {
    return <div>Select a component</div>;
  }

const handleStyleChange = (prop: string, value: string) => {
  if (!isValidCssValue(prop, value)) return; // ❌ skip invalid

  const updatedComponents = components.map((component) =>
    component.id === selectedComponent.id
      ? {
          ...component,
          style: {
            ...component.style,
            [prop]: value,
          },
        }
      : component
  );

  setComponents(updatedComponents);
  setAppliedStyle((prev) => ({ ...prev, [prop]: value }));
};


  return (
    <div className="flex flex-col">
      <div className="text-xl">Edit Component</div>
      <div className="border-b border-black border-2"></div>

      <div className="flex flex-col py-2">
        <div className="flex justify-between">
          <span>Component type:</span>
          <span>{selectedComponent.type}</span>
        </div>

        <div className="flex flex-col">
          <div className="border-b border-black border-1"></div>
          <h3>Component content</h3>
          <p>{selectedComponent.content}</p>
        </div>

        <div className="border-b mt-0.5 border-black border-1"></div>

        <div className="my-2 flex flex-col bg-gray-200">
          <div>
            <h2>Edit Styles</h2>
          </div>
          <div className="flex flex-col bg-gray-300">
            {Object.keys(appliedStyle).map((key) => (
              <StylePropertyValue
                key={key}
                prop={key}
                value={appliedStyle[key]}
                onChange={handleStyleChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



function StylePropertyValue({
  prop,
  value,
  onChange,
}: {
  prop: string;
  value: string;
  onChange: (prop: string, value: string) => void;
}) {
  const [propertyValue, setPropertyValue] = useState(value);

  useEffect(() => {
    setPropertyValue(value); // Sync if value is updated externally
  }, [value]);

  function changeStyleProperty(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setPropertyValue(newValue);
    onChange(prop, newValue);
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <span className="w-1/3 text-right font-mono">{prop}</span>
      <input
        className="flex-1 border px-2 py-1 rounded bg-white text-sm"
        value={propertyValue}
        onChange={changeStyleProperty}
      />
    </div>
  );
}

const knownFonts = [
  "Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "Verdana",
  "Tahoma", "Trebuchet MS", "Impact", "Comic Sans MS", "System-ui", "serif", "sans-serif", "monospace"
];

function isValidFontFamily(value: string): boolean {
  return knownFonts.includes(value);
}


function isValidCssValue(property: string, value: string): boolean {
if (property === "fontFamily") {
    return isValidFontFamily(value);
}
  const el = document.createElement("div");
  el.style[property as any] = value;
  return el.style[property as any] === value;
}
