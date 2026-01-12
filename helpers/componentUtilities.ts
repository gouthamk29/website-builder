import { Component } from "@/types";

export const getComponentById  = (id:string,components:Component[])=>{

    return components.filter(comp=>comp.id==id).at(0);

}