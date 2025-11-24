# Drag & Drop Website Builder

User-friendly drag-and-drop website builder for creating pages visually without code.

## Features

* Visual editor with drag-and-drop components (div, header, images, text, lists, etc).
* Reorder components with DnD (uses `@dnd-kit`).
* Component style editing via a sidebar.
* Save / load projects (versioned snapshots).
* Live preview and editor split view.
* Export project HTML/CSS (planned).

---

## Tech Used
- React
- NextJs
- DnD kit
- Zustand
- Moongoose

## Quick start

### Prerequisites

* Node.js (v16+ recommended)
* npm (or yarn)

### Install

```bash
npm install
```

## Database Setup

To connect the project to your database (e.g., Supabase / PostgreSQL / MySQL), follow these steps:

- Create a .env file and add your database URL and any required secrets:

```
DATABASE_URL="your-database-connection-url"
```


### Run (development)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available scripts

* `npm run dev` — start dev server
* `npm run build` — build production assets
* `npm run start` — start the production server
* `npm run lint` — run linter (if configured)
* `npm run test` — run tests (if configured)

> Add or adjust scripts to match your project's package.json.

---

## Project structure (example)

```
/src
  /components   # Editor, Sidebar, Draggable components
  /pages        # Next.js pages (or app directory)
  /lib          # helpers & utilities
  /styles       # global styles / tailwind
  /server       # API routes (save/load projects)
```

---

## Data & State

* Components are stored in a `components` state array. Each component object contains `id`, `type`, `attributes`, `style`, and `parent_id`.
* Drag overlay and `DraggedPreview` are used to render absolute previews while dragging.
* Versioning: recent snapshots are kept (e.g. `VERSION_LIMIT = 20`).

---

## Tips & Troubleshooting

* Make sure to Setup database before starting the program.
---

## Development notes

* Use `@dnd-kit` sensors (`PointerSensor` etc.) and `DragOverlay` for smooth drag-and-drop.
* Keep a minimal default component (`_body`) to serve as the root container for pages.
* For image-heavy projects, prefer lazy loading and store transformed URLs for large sizes.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add ..."`
4. Push to the branch and open a pull request

Please include tests and keep code style consistent.

---

## License

MIT License — add a LICENSE file if you publish the project.

