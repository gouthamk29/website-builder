import { Component } from "@/types"


// const DEVComponentList : Component[] = [
//      {
//     id: "_body",
//     type: "div",
//     attributes: { id: "_body" },
//     style: {
//       padding:"0",
//       margin:"auto",
//       width: "100%",
//       height: "auto",
//       position: "relative",
//        overflowY: "auto", // ensure scroll only when needed
//       backgroundColor: "#fff",
//     },
//     children_id: ["comp_123"],
//   },
//   {
//     id: "comp_123",
//     type: "div",
//     attributes: { id: "hero-section" },
//     style: {
//       width: "100%",
//       height: "200px",
//       backgroundColor: "lightblue",
//     },
//     children_id: ["text-1","text-2"],
//   },
//   {
//      id: "text-1",
//   type: "p",
//   attributes: {},
//   style: { color: "black", fontSize: "16px" },
//   content: "Welcome to my site1!" // ✅ No children_id here
//   },
  
//   {
//      id: "text-2",
//   type: "p",
//   attributes: {},
//   style: { color: "black", fontSize: "18px" },
//   content: "Welcome to my site2!" // ✅ No children_id here
//   },
  
//   ];

// export default DEVComponentList;


const DEVComponentList: Component[] = [
  {
    id: "_body",
    type: "div",
    attributes: { id: "_body" },
    style: {
      padding: "1rem",
      margin: "auto",
      width: "100%",
      height: "auto",
      position: "relative",
      backgroundColor: "#f0f0f0",
    },
    children_id: ["header", "main", "footer"],
  },

  // HEADER
  {
    id: "header",
    type: "header",
    attributes: {},
    style: {
      backgroundColor: "#333",
      color: "white",
      padding: "1rem",
    },
    children_id: ["logo", "navbar"],
  },
  {
    id: "logo",
    type: "h1",
    attributes: {},
    style: { fontSize: "24px" },
    content: "MyLogo",
  },
  {
    id: "navbar",
    type: "nav",
    attributes: {},
    style: {
      display: "flex",
      gap: "1rem",
    },
    children_id: ["nav1", "nav2"],
  },
  {
    id: "nav1",
    type: "a",
    attributes: { href: "#" },
    style: { textDecoration: "none", color: "white" },
    content: "Home",
  },
  {
    id: "nav2",
    type: "a",
    attributes: { href: "#" },
    style: { textDecoration: "none", color: "white" },
    content: "Contact",
  },

  // MAIN
  {
    id: "main",
    type: "main",
    attributes: {},
    style: {
      padding: "2rem",
      backgroundColor: "white",
    },
    children_id: ["hero", "content"],
  },
  {
    id: "hero",
    type: "section",
    attributes: {},
    style: {
      height: "200px",
      backgroundColor: "lightblue",
    },
    children_id: ["heroText"],
  },
  {
    id: "heroText",
    type: "h2",
    attributes: {},
    style: { fontSize: "28px" },
    content: "Welcome to our product",
  },
  {
    id: "content",
    type: "section",
    attributes: {},
    style: { padding: "1rem" },
    children_id: ["para1", "card"],
  },
  {
    id: "para1",
    type: "p",
    attributes: {},
    style: {},
    content: "This is a description paragraph with some text.",
  },
  {
    id: "card",
    type: "div",
    attributes: {},
    style: {
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
    },
    children_id: ["cardTitle", "cardContent"],
  },
  {
    id: "cardTitle",
    type: "h3",
    attributes: {},
    style: {},
    content: "Card Title",
  },
  {
    id: "cardContent",
    type: "p",
    attributes: {},
    style: {},
    content: "Card content goes here.",
  },

  // FOOTER
  {
    id: "footer",
    type: "footer",
    attributes: {},
    style: {
      padding: "1rem",
      backgroundColor: "#eee",
      textAlign: "center",
    },
    children_id: ["footerText"],
  },
  {
    id: "footerText",
    type: "p",
    attributes: {},
    style: { fontSize: "14px" },
    content: "© 2025 MySite. All rights reserved.",
  },
];

export default DEVComponentList;
