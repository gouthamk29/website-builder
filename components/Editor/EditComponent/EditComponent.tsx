'use client'

import { Component } from "@/types";
import { componentProperty } from "./componentProperties";
import { useEffect, useRef, useState } from "react";
import {CustomizableComponent} from "../EditorSidebar"


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

const handleContentChange = (value: string) => {
  const updatedComponents = components.map((component) =>
    component.id === selectedComponent.id
      ? ({ ...component, content: value } as Component)
      : component
  );

  setComponents(updatedComponents);
};


const handleStyleChange = (prop: string, value: string) => {
  console.log(`incoming prop check ${prop} :${value}`)
  if (!isValidCssValue(prop, value)) return; 
  console.log(`incoming prop valid ${prop} :${value}`)

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
          <span>{
            Object.entries(CustomizableComponent)
            .find(([_, value]) => value[1] === selectedComponent.type)?.[0] 
            || selectedComponent.type
          }
          </span>
        </div>

        <div className="flex flex-col">
          <div className="border-b border-black border-1"></div>
          <h3>Component content</h3>
          <textarea  onChange={(e) => handleContentChange(e.target.value)} className="bg-gray-200 ring-offset-1 cursor-pointer rounded-md border p-0.5 focus:bg-gray-300 focus:ring-1 ring-blue-500 " value={selectedComponent.content} />
        </div>

        <div className="border-b mt-0.5 border-black border-1"></div>

        <div className="my-2 flex flex-col bg-gray-200">
          
          <div className="flex flex-col bg-gray-300 p-1">
            {/* {Object.keys(appliedStyle).map((key) => (
              <StylePropertyValue
                key={key}
                prop={key}
                value={appliedStyle[key]}
                onChange={handleStyleChange}
              />
            ))} */}
            <StyleGroup properties={fontProperties} title="Font Settings" filter={(prop)=>(!prop.collapsable)} onChange={handleStyleChange} />
            <StyleGroup properties={fontProperties} title="Advanced Font Settings" filter={(prop)=>(prop.collapsable!)} onChange={handleStyleChange} />
            <StyleGroup properties={layoutProperties} title="Layout Settings" filter={(prop)=>(!prop.collapsable!)} onChange={handleStyleChange} />
            <StyleGroup properties={layoutProperties} title="Advance Layout Settings" filter={(prop)=>(prop.collapsable!)} onChange={handleStyleChange} />


          </div>
        </div>
      </div>
    </div>
  );
}

function FontPropertiesSettings({fontProperties,handleStyleChange}){
  
  const [expand,setExpand]=useState(false)
  
  
  return  <div>
              <span className="font-bold">Font Properties</span>
              <div>
                {
                  Object.values(fontProperties).map(x=>
                    {
                      if(!x['collapsable'])
                        return <StyleCategoryValue key={x['label']} property={x} onStyleChange={handleStyleChange}/>
                    }
                  )
                }
                </div>
                <span className="font-semibold">More Font property</span>
                <span onClick={()=>setExpand(x=>!x)}>🎇</span>
                <div className={`${expand?'':'max-h-[1px] overflow-hidden'}  transition-all`}>
                {
                  Object.values(fontProperties).map(x=>
                    {
                      if(x['collapsable'])
                        return <StyleCategoryValue key={x['label']} property={x} onStyleChange={handleStyleChange}/>
                    }
                  )
                }
                </div>
            </div>
}


interface StyleProperty {
  label: string;
  cssProp: string;
  default: string;
  unit?: string;
  options?: string[];
  type?: string;
  collapsable?: boolean;
  hint?: string;
}


interface StyleGroupProps {
  title: string;
  properties: Record<string, StyleProperty>;
  filter?: (prop: StyleProperty) => boolean;
  onChange:(string:string,value:string)=>void
}

export function StyleGroup(
  {
    title,
    properties,
    filter=()=>true,
    onChange
  }: StyleGroupProps
){
  const [isOpen,setIsOpen] =useState(false);
  const contentRef  = useRef<HTMLDivElement>(null);

  const filteredProps = Object.values(properties).filter(filter)

  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    if (isOpen && contentRef .current) {

      let componentHeight = contentRef .current.scrollHeight>100?contentRef .current.scrollHeight:100;
      setMaxHeight(`${componentHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen, filteredProps.length]);

  if (filteredProps.length === 0) return null;

  return (
    <div className="border-b border-gray-300 py-1">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full justify-between items-center font-semibold"
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight }}
      >
        <div className="space-y-1 mt-2">
          {filteredProps.map((prop) => (
            <StyleCategoryValue key={prop.label} property={prop} onStyleChange={onChange} />
          ))}
        </div>
      </div>
    </div>
  );

}



function StyleCategoryValue({property,onStyleChange}){
  
  const [value,setValue]=useState(property['default'] as string |"")
  
  function changeStyleProperty(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    console.log(newValue,property['cssProp'])
    setValue(newValue);
    onStyleChange(property['cssProp'], newValue);
  }


  return <div className="flex flex-row gap-1 justify-between mt-0.5">
    
      <>
    <span>
       {property['label']}
    </span>
    <span className="bg-gray-200">
        <input className="text-right" value={value}  onChange={changeStyleProperty}/>
    </span>
      </>
    
  </div>
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
    setPropertyValue(value); 
  }, [value]);

  function changeStyleProperty(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    console.log(newValue)
    setPropertyValue(newValue);
    onChange(prop, newValue);
  }

  function changeColorProperty(e){
    console.log(e);
    if(e.target.value)
      changeStyleProperty(e);
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <span className="w-1/3 text-right font-mono">{prop}</span>
      {
       prop==='color'||prop==='backgroundColor'?(
        <>
        <input type="color" value={convertToHexIfColor(propertyValue)} onChange={changeColorProperty}/>
        <input type="value" value={convertToHexIfColor(propertyValue)} onChange={changeColorProperty} className="flex-1 border px-2 py-1 rounded bg-grey text-sm text-right"/>
        </>

       )
        :(
          <input
          className="flex-1 border px-2 py-1 rounded bg-white text-sm text-right"
          value={propertyValue}
          onChange={changeStyleProperty}
          />
      )
      }
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
if (property ==="color"||property==="backgroundColor"){
    return isValidColor(value);
}
  const el = document.createElement("div");
  el.style[property as any] = value;
  return el.style[property as any] === value;
}

function isValidColor(value){
  const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (hexColorRegex.test(value)) {
    return true;
  }

  const s = new Option().style;
  s.color = '';
  s.color = value;

  return s.color !== '';
}

function convertToHexIfColor(value: string): string {
  const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (hexRegex.test(value)) return value.toLowerCase();

  const el = document.createElement("div");
  el.style.color = value;
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);

  const match = computed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match || el.style.color === '') {
    // It's an invalid color — return an empty string or handle it gracefully
    console.warn(`Invalid color input: "${value}"`);
    return "#000000"; // or return "" if you want to block it
  }

  const [r, g, b] = match.slice(1).map(Number);
  return (
    "#" +
    [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")
  ).toLowerCase();
}



export const fontProperties = {
  fontFamily: {
    label: "Font Family",
    cssProp: "fontFamily",
    default: "Arial, sans-serif",
    options: [
      "Arial, sans-serif",
      "Helvetica, sans-serif",
      "Times New Roman, serif",
      "Georgia, serif",
      "Courier New, monospace",
      "Verdana, sans-serif",
      "Poppins, sans-serif",
      "Roboto, sans-serif",
    ],
    collapsable: false,
  },
  fontSize: {
    label: "Font Size",
    cssProp: "fontSize",
    default: "16px",
    unit: "px",
    collapsable: false,
  },
  fontWeight: {
    label: "Font Weight",
    cssProp: "fontWeight",
    default: "400",
    options: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    collapsable: false,
  },
  fontStyle: {
    label: "Font Style",
    cssProp: "fontStyle",
    default: "normal",
    options: ["normal", "italic", "oblique"],
    collapsable: false,
  },
  lineHeight: {
    label: "Line Height",
    cssProp: "lineHeight",
    default: "1.5",
    unit: "",
    collapsable: false,
  },
  letterSpacing: {
    label: "Letter Spacing",
    cssProp: "letterSpacing",
    default: "0px",
    unit: "px",
    collapsable: true,
  },
  textAlign: {
    label: "Text Align",
    cssProp: "textAlign",
    default: "left",
    options: ["left", "center", "right", "justify", "start", "end"],
    collapsable: false,
  },
  textDecoration: {
    label: "Text Decoration",
    cssProp: "textDecoration",
    default: "none",
    options: ["none", "underline", "overline", "line-through"],
    collapsable: true,
  },
  textTransform: {
    label: "Text Transform",
    cssProp: "textTransform",
    default: "none",
    options: ["none", "capitalize", "uppercase", "lowercase"],
    collapsable: true,
  },
  textShadow: {
    label: "Text Shadow",
    cssProp: "textShadow",
    default: "none",
    hint: "e.g. 2px 2px 5px rgba(0,0,0,0.3)",
    collapsable: true,
  },
  color: {
    label: "Text Color",
    cssProp: "color",
    default: "#000000",
    type: "color",
    collapsable: false,
  },
  backgroundColor: {
    label: "Background Color",
    cssProp: "backgroundColor",
    default: "transparent",
    type: "color",
    collapsable: true,
  },
  whiteSpace: {
    label: "White Space",
    cssProp: "whiteSpace",
    default: "normal",
    options: ["normal", "nowrap", "pre", "pre-line", "pre-wrap"],
    collapsable: true,
  },
  wordBreak: {
    label: "Word Break",
    cssProp: "wordBreak",
    default: "normal",
    options: ["normal", "break-all", "keep-all", "break-word"],
    collapsable: true,
  },
  overflowWrap: {
    label: "Overflow Wrap",
    cssProp: "overflowWrap",
    default: "break-word",
    options: ["normal", "break-word", "anywhere"],
    collapsable: true,
  },
  direction: {
    label: "Text Direction",
    cssProp: "direction",
    default: "ltr",
    options: ["ltr", "rtl"],
    collapsable: true,
  },
  writingMode: {
    label: "Writing Mode",
    cssProp: "writingMode",
    default: "horizontal-tb",
    options: ["horizontal-tb", "vertical-rl", "vertical-lr"],
    collapsable: true,
  },
} 


export const layoutProperties = {
  display: {
    label: "Display",
    cssProp: "display",
    default: "block",
    options: ["block", "inline-block", "inline", "flex", "grid", "none"],
    collapsable: false,
  },

  flexDirection: {
    label: "Flex Direction",
    cssProp: "flexDirection",
    default: "row",
    options: ["row", "row-reverse", "column", "column-reverse"],
    collapsable: true,
  },

  justifyContent: {
    label: "Justify Content",
    cssProp: "justifyContent",
    default: "flex-start",
    options: [
      "flex-start",
      "center",
      "flex-end",
      "space-between",
      "space-around",
      "space-evenly",
    ],
    collapsable: true,
  },

  alignItems: {
    label: "Align Items",
    cssProp: "alignItems",
    default: "stretch",
    options: ["stretch", "flex-start", "center", "flex-end", "baseline"],
    collapsable: true,
  },

  alignSelf: {
    label: "Align Self",
    cssProp: "alignSelf",
    default: "auto",
    options: ["auto", "flex-start", "center", "flex-end", "baseline", "stretch"],
    collapsable: true,
  },

  gap: {
    label: "Gap",
    cssProp: "gap",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  padding: {
    label: "Padding",
    cssProp: "padding",
    default: "0px",
    unit: "px",
    collapsable: false,
  },

  paddingTop: {
    label: "Padding Top",
    cssProp: "paddingTop",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  paddingBottom: {
    label: "Padding Bottom",
    cssProp: "paddingBottom",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  paddingLeft: {
    label: "Padding Left",
    cssProp: "paddingLeft",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  paddingRight: {
    label: "Padding Right",
    cssProp: "paddingRight",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  margin: {
    label: "Margin",
    cssProp: "margin",
    default: "0px",
    unit: "px",
    collapsable: false,
  },

  marginTop: {
    label: "Margin Top",
    cssProp: "marginTop",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  marginBottom: {
    label: "Margin Bottom",
    cssProp: "marginBottom",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  marginLeft: {
    label: "Margin Left",
    cssProp: "marginLeft",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  marginRight: {
    label: "Margin Right",
    cssProp: "marginRight",
    default: "0px",
    unit: "px",
    collapsable: true,
  },

  width: {
    label: "Width",
    cssProp: "width",
    default: "auto",
    unit: "px",
    collapsable: false,
  },

  height: {
    label: "Height",
    cssProp: "height",
    default: "auto",
    unit: "px",
    collapsable: false,
  },

  maxWidth: {
    label: "Max Width",
    cssProp: "maxWidth",
    default: "100%",
    unit: "%",
    collapsable: true,
  },

  maxHeight: {
    label: "Max Height",
    cssProp: "maxHeight",
    default: "100%",
    unit: "%",
    collapsable: true,
  },

  overflow: {
    label: "Overflow",
    cssProp: "overflow",
    default: "visible",
    options: ["visible", "hidden", "scroll", "auto", "clip"],
    collapsable: true,
  },

  position: {
    label: "Position",
    cssProp: "position",
    default: "static",
    options: ["static", "relative", "absolute", "fixed", "sticky"],
    collapsable: true,
  },

  top: {
    label: "Top",
    cssProp: "top",
    default: "auto",
    unit: "px",
    collapsable: true,
  },

  left: {
    label: "Left",
    cssProp: "left",
    default: "auto",
    unit: "px",
    collapsable: true,
  },

  right: {
    label: "Right",
    cssProp: "right",
    default: "auto",
    unit: "px",
    collapsable: true,
  },

  bottom: {
    label: "Bottom",
    cssProp: "bottom",
    default: "auto",
    unit: "px",
    collapsable: true,
  },

  backgroundColor: {
    label: "Background Color",
    cssProp: "backgroundColor",
    default: "#ffffff",
    type: "color",
    collapsable: false,
  },

  borderRadius: {
    label: "Border Radius",
    cssProp: "borderRadius",
    default: "0px",
    unit: "px",
    collapsable: true,
  },
};
