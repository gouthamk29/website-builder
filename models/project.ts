import { Component } from "@/types";
import mongoose, { model,models,Schema  } from "mongoose";

const VERSION_LIMIT = 20;

const versionSchema = new Schema(
  {
    data: Schema.Types.Mixed, // snapshot of data
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);


// const defaultStarterComponent ={
//     id: "_body",
//     type: "div",
//     attributes: { id: "_body" },
//     style: {
//       padding: "auto",
//       margin: "auto",
//       width: "100%",
//       height: "100%",
//       position: "auto",
//       backgroundColor: "#f0f0f0",
//     },
//     children_id: [],
//   }


export const defaultComponents: Component[] = [
  // Root Body
  {
    id: "_body",
    type: "div",
    attributes: { id: "_body" },
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "100vh",
      width: "100%",
      margin: "0",
      backgroundColor: "#f9fafb",
      color: "#111827",
      fontFamily: "'Inter', sans-serif",
      fontSize: "16px",
      lineHeight: "1.6",
      boxSizing: "border-box",
    },
    parent_id: null,
    children_id: ["_header", "_hero", "_features", "_footer"],
  },

  // Header
  {
    id: "_header",
    type: "header",
    attributes: {},
    style: {
      width: "100%",
      padding: "16px 32px",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: "0",
      zIndex: "10",
    },
    parent_id: "_body",
    children_id: ["_logo", "_nav"],
  },
  {
    id: "_logo",
    type: "h2",
    attributes: {},
    style: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#2563eb",
    },
    parent_id: "_header",
    content: "MySite",
  },
  {
    id: "_nav",
    type: "nav",
    attributes: {},
    style: {
      display: "flex",
      gap: "20px",
      fontSize: "1rem",
    },
    parent_id: "_header",
    children_id: ["_navHome", "_navAbout", "_navContact"],
  },
  {
    id: "_navHome",
    type: "a",
    attributes: { href: "#" },
    style: { textDecoration: "none", color: "#111827" },
    parent_id: "_nav",
    content: "Home",
  },
  {
    id: "_navAbout",
    type: "a",
    attributes: { href: "#" },
    style: { textDecoration: "none", color: "#111827" },
    parent_id: "_nav",
    content: "About",
  },
  {
    id: "_navContact",
    type: "a",
    attributes: { href: "#" },
    style: { textDecoration: "none", color: "#111827" },
    parent_id: "_nav",
    content: "Contact",
  },

  // Hero Section
  {
    id: "_hero",
    type: "section",
    attributes: {},
    style: {
      width: "100%",
      padding: "80px 20px",
      textAlign: "center",
      backgroundColor: "#eef2ff",
    },
    parent_id: "_body",
    children_id: ["_heroTitle", "_heroText", "_heroButton"],
  },
  {
    id: "_heroTitle",
    type: "h1",
    attributes: {},
    style: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1e3a8a",
      marginBottom: "10px",
    },
    parent_id: "_hero",
    content: "Build Anything Visually ✨",
  },
  {
    id: "_heroText",
    type: "p",
    attributes: {},
    style: {
      fontSize: "1.125rem",
      color: "#374151",
      marginBottom: "20px",
    },
    parent_id: "_hero",
    content: "Drag, drop, and create your dream website instantly.",
  },
  {
    id: "_heroButton",
    type: "button",
    attributes: {},
    style: {
      backgroundColor: "#2563eb",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      fontSize: "1rem",
      cursor: "pointer",
    },
    parent_id: "_hero",
    content: "Get Started",
  },

  // Features Section
  {
    id: "_features",
    type: "section",
    attributes: {},
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "1000px",
      margin: "60px auto",
      padding: "20px",
    },
    parent_id: "_body",
    children_id: ["_feature1", "_feature2", "_feature3"],
  },
  ...["_feature1", "_feature2", "_feature3"].map((id, i) => ({
    id,
    type: "div",
    attributes: {},
    style: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      textAlign: "center",
    },
    parent_id: "_features",
    children_id: [`${id}_title`, `${id}_text`],
  })),
  ...[
    {
      id: "_feature1_title",
      content: "Drag & Drop",
      text: "Easily move elements around your page visually.",
    },
    {
      id: "_feature2_title",
      content: "Customizable",
      text: "Change colors, fonts, and layouts effortlessly.",
    },
    {
      id: "_feature3_title",
      content: "Responsive",
      text: "Looks great on any device automatically.",
    },
  ].flatMap(({ id, content, text }) => [
    {
      id,
      type: "h3",
      attributes: {},
      style: {
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px",
      },
      parent_id: id.replace("_title", ""),
      content,
    },
    {
      id: id.replace("_title", "_text"),
      type: "p",
      attributes: {},
      style: { color: "#4b5563" },
      parent_id: id.replace("_title", ""),
      content: text,
    },
  ]),

  // Footer
  {
    id: "_footer",
    type: "footer",
    attributes: {},
    style: {
      width: "100%",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
      marginTop: "auto",
    },
    parent_id: "_body",
    content: "© 2025 MySite. All rights reserved.",
  },
];



const projectSchema  = new Schema({
        projectId:{type:String, required:true,index:true},
        projectName:{type:String,default:"Untitled Project"},
        projectDescription:{type:String,default:""},
        userId: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        index: true, 
        },

        data: {
        type: Schema.Types.Mixed,
        default: 
          defaultComponents
        
        },

        versions:{
            type:[versionSchema],
            default:[],
        }

    },
    {
        timestamps:true
    }
)


projectSchema.pre("validate", async function (next) {
  
  if (!this.isNew) {
    try {
     
    const ProjectModel = mongoose.model("Project");
    const existing = await ProjectModel.findById(this._id).lean();

      if (existing && existing.data) {
        // Push old data into versions array
        this.versions.push({
          data: existing.data,
          updatedAt: new Date(),
        });

        // Limit versions to last 20
        if (this.versions.length > VERSION_LIMIT) {
            this.versions.splice(0, this.versions.length - VERSION_LIMIT);
        }
      }
    } catch (err) {
      console.error("Error fetching previous version:", err);
    }
  }

  next();
});



const Project = models.Project || model("Project", projectSchema);
export default Project;

