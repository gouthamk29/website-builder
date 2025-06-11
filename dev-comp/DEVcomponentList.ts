import { Component } from "@/types"


const DEVComponentList : Component[] = [
     {
    id: "_body",
    type: "div",
    attributes: { id: "_body" },
    style: {
      padding:"0",
      margin:"0",
      width: "100%",
      height: "auto",
      position: "relative",
       overflowY: "auto", // ensure scroll only when needed
      backgroundColor: "#fff",
    },
    children_id: ["comp_123", "div-1"],
  },
  {
    id: "comp_123",
    type: "div",
    attributes: { id: "hero-section" },
    style: {
      width: "100%",
      height: "300px",
      backgroundColor: "lightblue",
      position: "relative",
      right: "0",
      top: "1rem",
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
  style: { color: "black", fontSize: "16px" },
  content: "Welcome to my site2!" // ✅ No children_id here
  },
  {
    id: "div-1",
    type: "div",
    attributes: {},
    style: {
      backgroundColor: "red",
      margin: "2rem",
      height: "1rem",
      width: "1rem",
      position: "absolute",
      top:"5rem",
      right:"5rem",
      "z-index":"1",
    },
    children_id: [],
  },
  ];

export default DEVComponentList;