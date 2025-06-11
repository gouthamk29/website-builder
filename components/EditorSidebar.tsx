/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Dispatch, useState, useEffect, SetStateAction, useRef } from "react";
import { Component } from "@/types"; 
import cx  from "classnames";
import { ListCollapse, Pencil, SquarePlus } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { AddComponentElements } from "./AddComponentElements";



function EditorSidebarOld({
  selectedId,
  components,
  setComponents,
  setSelectedId,
}: {
  selectedId: string | null,
  components: Component[] ,
  setComponents: Dispatch<SetStateAction<Component[]>>,
  setSelectedId:Dispatch<SetStateAction<string | null>>
}) {
  const selectedComponent = findComponentById(components, selectedId);

  const [localStyles, setLocalStyles] = useState<Record<string, string>>({});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    if (selectedComponent?.styles) {
      setLocalStyles({ ...selectedComponent.styles });
    }
  }, [selectedComponent]);

  if (!selectedComponent) {
    return <div className="p-4 text-gray-500">No component selected</div>;
  }

  const handleStyleChange = (key: string, value: string) => {
    setLocalStyles((prev) => ({ ...prev, [key]: value }));
  };

  const handleKeyChange = (oldKey: string, newKey: string) => {
    if (!newKey.trim() || oldKey === newKey) return;
    setLocalStyles((prev) => {
      const updated = { ...prev };
      updated[newKey] = updated[oldKey];
      delete updated[oldKey];
      return updated;
    });
  };

  const deleteStyle = (key: string) => {
    setLocalStyles((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const addStyle = () => {
    if (newKey.trim()) {
      setLocalStyles((prev) => ({ ...prev, [newKey]: newValue }));
      setNewKey("");
      setNewValue("");
    }
  };

  const confirmStyles = () => {
    const update = (comps: ComponentSchema[]): ComponentSchema[] =>
      comps.map((comp) => {
        if (comp.id === selectedId) {
          return { ...comp, styles: { ...localStyles } };
        } else if (comp.children?.length) {
          return { ...comp, children: update(comp.children) };
        }
        return comp;
      });
    setComponents(update(components));
  };

  return (
    <div className="p-4 bg-black border-l w-64 h-full overflow-auto">
      <h2 className="font-semibold text-lg mb-4">Component Styles</h2>

      {Object.entries(localStyles).map(([key, value]) => (
        <StyleEditorRow
          key={key}
          styleKey={key}
          value={value}
          onChange={(newKey, newValue) => {
            handleKeyChange(key, newKey);
            handleStyleChange(newKey, newValue);
          }}
          onDelete={() => deleteStyle(key)}
        />
      ))}

      <hr className="my-4" />

      <h3 className="text-sm font-semibold mb-2">Add New Style</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="property"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="w-1/2 border px-2 py-1 rounded text-sm"
        />
        <input
          type="text"
          placeholder="value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-1/2 border px-2 py-1 rounded text-sm"
        />
      </div>
      <button
        onClick={addStyle}
        className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 mb-4"
      >
        ➕ Add Style
      </button>

      <button
        onClick={confirmStyles}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        ✅ Confirm Changes
      </button>
    </div>
  );
}

function StyleEditorRow({
  styleKey,
  value,
  onChange,
  onDelete,
}: {
  styleKey: string;
  value: string;
  onChange: (newKey: string, newValue: string) => void;
  onDelete: () => void;
}) {
  const [keyEdit, setKeyEdit] = useState(styleKey);
  const [valEdit, setValEdit] = useState(value);

  useEffect(() => {
    setKeyEdit(styleKey);
    setValEdit(value);
  }, [styleKey, value]);

  return (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={keyEdit}
        onChange={(e) => setKeyEdit(e.target.value)}
        className="w-1/3 border px-1 py-1 rounded text-sm"
      />
      <input
        type="text"
        value={valEdit}
        onChange={(e) => setValEdit(e.target.value)}
        className="w-1/2 border px-1 py-1 rounded text-sm"
      />
      <button
        onClick={() => onChange(keyEdit, valEdit)}
        className="text-green-600 text-sm hover:underline"
      >
        ✔
      </button>
      <button
        onClick={onDelete}
        className="text-red-500 text-sm hover:underline"
      >
        ✕
      </button>
    </div>
  );
}

function findComponentById(
  components: ComponentSchema[],
  id: string | null
): ComponentSchema | null {
  for (const comp of components) {
    if (comp.id === id) return comp;
    if (comp.children?.length) {
      const found = findComponentById(comp.children, id);
      if (found) return found;
    }
  }
  return null;
}

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
    <div className={cx("h-full w-full  bg-white text-black overflow-hidden flex flex-col gap-2 py-4",
      {'max-w-16 bg-amber-800' : toggleSidebar===false,}
    )}>
          <div className="px-4">
            <button
              data-tooltip-id="my-tooltip" data-tooltip-content="Toggle Sidebar"
              className="w-full bg-amber-500 flex justify-center"
              onClick={() => setToggleSidebar((e) => !e)}>
                <ListCollapse/>
            </button>
            <Tooltip id="my-tooltip" place="left-start"/>
          </div>

          <div className="px-4">
              <button
                data-tooltip-id="my-tooltip" data-tooltip-content="Add Component"
                className="w-full bg-amber-500 flex justify-center anchor-target"
                popoverTarget="add-component" popoverTargetAction="toggle">
                  <SquarePlus/>
              </button>
              <div id="add-component" popover='auto' role="tooltip" className="side-bar-anchor rounded-xl mx-2 my-2">
                <AddComponent/>
              </div>
          </div>

          <div className="px-4">
              <button
                data-tooltip-id="my-tooltip" data-tooltip-content="Edit Component"
                className="w-full bg-amber-500 flex justify-center"
                popoverTarget="edit-component" popoverTargetAction="toggle">
                  <Pencil/>
              </button>
              <div id="edit-component" popover='auto' role="tooltip" className="p-4 mt-2 rounded shadow bg-gray-100 text-black border border-gray-300">
                Edit component
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