import { Component } from "@/types";

const DEVComponentList: Component[] = [
  // BODY
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
    parent_id: null,
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
    parent_id: "_body",
  },
  {
    id: "logo",
    type: "h1",
    attributes: {},
    style: { fontSize: "24px" },
    content: "MyLogo",
    parent_id: "header",
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
    parent_id: "header",
  },
  {
    id: "nav1",
    type: "a",
    attributes: { href: "#" },
    style: { textDecoration: "none", color: "white" },
    content: "Home",
    parent_id: "navbar",
  },
  {
    id: "nav2",
    type: "a",
    attributes: { href: "#" },
    style: { textDecoration: "none", color: "white" },
    content: "Contact",
    parent_id: "navbar",
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
    parent_id: "_body",
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
    parent_id: "main",
  },
  {
    id: "heroText",
    type: "h2",
    attributes: {},
    style: { fontSize: "28px" },
    content: "Welcome to our product",
    parent_id: "hero",
  },
  {
    id: "content",
    type: "section",
    attributes: {},
    style: { padding: "1rem" },
    children_id: ["para1", "card"],
    parent_id: "main",
  },
  {
    id: "para1",
    type: "p",
    attributes: {},
    style: {},
    content: "This is a description paragraph with some text.",
    parent_id: "content",
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
    parent_id: "content",
  },
  {
    id: "cardTitle",
    type: "h3",
    attributes: {},
    style: {},
    content: "Card Title",
    parent_id: "card",
  },
  {
    id: "cardContent",
    type: "p",
    attributes: {},
    style: {},
    content: "Card content goes here.",
    parent_id: "card",
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
    parent_id: "_body",
  },
  {
    id: "footerText",
    type: "p",
    attributes: {},
    style: { fontSize: "14px" },
    content: "© 2025 MySite. All rights reserved.",
    parent_id: "footer",
  },
];

export default DEVComponentList;
