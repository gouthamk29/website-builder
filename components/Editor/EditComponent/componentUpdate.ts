import { Component } from "@/types";

const knownFonts = [
  "Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "Verdana",
  "Tahoma", "Trebuchet MS", "Impact", "Comic Sans MS", "System-ui", "serif", "sans-serif", "monospace"
];


type changeAction= "content" | "style"

type changes ={
        key: string | undefined;
        value:string;
}

interface IcomponentUpdate {
    component:Component;
    action:changeAction;
    changes:changes

} 

export function componentUpdate({component,action,changes}:IcomponentUpdate):Component|null{

    if(action==="content"){
        component.content = changes.value
    }
    
    if(action=='style'){
      if(changes.key==undefined){
        console.log("Component Update:",`component update of: ${component} has action : ${action} has no key of change style property.`)
        return component;
      }
      if(!isValidCssValue(changes.key,changes.value)){
        console.log("Component Update:",`component update of: ${component} has action : ${action} has no valid css value for key:${changes.key} and ${changes.value}.`)
        return null;
      }
     
      component.style = {
        ...component.style,
        [changes.key]:changes.value,
      }

    }
    console.log("Component update:",component)
    return component;
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

function isValidColor(value:string){
  const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (hexColorRegex.test(value)) {
    return true;
  }

  const s = new Option().style;
  s.color = '';
  s.color = value;

  return s.color !== '';
}


function isValidFontFamily(value: string): boolean {
  return knownFonts.includes(value);
}
