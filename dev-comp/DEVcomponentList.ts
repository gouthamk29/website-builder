import { Component } from "@/types"


const DEVComponentList : Component[] = [
     {
    id: "_body",
    type: "div",
    attributes: { id: "_body" },
    style: {
      padding:"0",
      margin:"auto",
      width: "100%",
      height: "auto",
      position: "relative",
       overflowY: "auto", // ensure scroll only when needed
      backgroundColor: "#fff",
    },
    children_id: ["comp_123"],
  },
  {
    id: "comp_123",
    type: "div",
    attributes: { id: "hero-section" },
    style: {
      width: "100%",
      height: "200px",
      backgroundColor: "lightblue",
    },
    children_id: ["text-1","text-2"],
  },
  {
     id: "text-1",
  type: "p",
  attributes: {},
  style: { color: "black", fontSize: "16px" },
  content: "Welcome to my site1!" // ✅ No children_id here
  },
  
  {
     id: "text-2",
  type: "p",
  attributes: {},
  style: { color: "black", fontSize: "18px" },
  content: "Welcome to my site2!" // ✅ No children_id here
  },
  
  ];

export default DEVComponentList;