# CourseHub - Agent Coding Guidelines

## Project Overview

CourseHub is a course presentation website supporting Markdown and HTML PPT for teaching programming to beginners. The project uses vanilla JavaScript (ES modules) with no frontend framework.

---

## Build Commands

```bash
# Build the project (generates courses-data.js from courses/ directory)
npm run build

# Manual build
node build.js
```

**No linting or testing commands are currently configured.** If adding tests, use a test runner that supports ES modules (e.g., Vitest).

---

## Code Style Guidelines

### General

- Use **ES modules** (`import`/`export`) — the project uses `"type": "module"` in package.json
- Use **vanilla JavaScript** — no React, Vue, or other frameworks
- Use **4-space indentation** for consistency with existing code

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Functions/variables | camelCase | `renderCourseList`, `courseData` |
| Classes | PascalCase | `LaserPointer` |
| Constants | UPPER_SNAKE | `COURSES_DIR`, `OUTPUT_FILE` |
| Files | kebab-case or camelCase | `courses-data.js`, `markdown-renderer.js` |
| HTML/CSS ids | kebab-case | `course-list`, `lesson-card` |

### Imports

```javascript
// ES module imports
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
```

### HTML Generation

Use template literals with helper functions for HTML:

```javascript
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

container.innerHTML = courses.map(course => `
    <a href="course.html?slug=${encodeURIComponent(course.slug)}">
        <h2>${escapeHTML(course.title)}</h2>
    </a>
`).join('');
```

### CSS

- Use external CSS files in `/styles/` directory
- Inline styles are acceptable for dynamically created elements (see `laser-pointer.js`)
- Use CSS custom properties for theming when appropriate

### Error Handling

- Use `try/catch` for async operations and file system access
- Check file existence before operations: `fs.existsSync(path)`
- Provide fallback values for missing data
- Log meaningful error messages: `console.log(\`Generated ${OUTPUT_FILE}\`)`

### Type Checking

No TypeScript is used. If adding types, consider JSDoc annotations for documentation.

---

## Project Structure

```
CourseHub/
├── build.js              # Main build script (generates courses-data.js)
├── scripts/
│   ├── main.js           # Course list page logic
│   ├── course.js         # Course detail page logic
│   ├── lesson.js         # Lesson page logic
│   ├── markdown-renderer.js  # Markdown parsing utilities
│   ├── laser-pointer.js  # Laser pointer feature (class-based)
│   └── courses-data.js   # Auto-generated (do not edit)
├── courses/              # Course content (Markdown files)
│   └── [course-name]/
│       ├── outline.md    # Course metadata (frontmatter)
│       └── [lesson-name]/
│           ├── outline.md
│           └── meta.json
├── styles/
│   └── main.css
└── index.html, course.html, lesson.html, demo.html
```

---

## Course Content Structure

Course content uses Markdown with YAML frontmatter:

```yaml
---
title: 课时名称
description: 简短描述
---
# Content here
```

Use the `skills/` directory for teaching guidelines. When creating lesson plans, follow `skills/教案生成.md` which emphasizes:
- Simple, accessible language for beginners
- Life analogies for programming concepts
- Step-by-step problem decomposition

---

## Interactive Courseware

For interactive demos, follow `skills/交互课件生成.md`:
- Use TailwindCSS via CDN
- Use native HTML5 Drag and Drop API
- Include learning tracking (score, streak)
- Provide immediate feedback on interactions
- Dark theme: background `#0a0a0a`, cards `rgba(255,255,255,0.05)`

---

## VS Code Configuration

Recommended extensions (see `.vscode/extensions.json`):
- `mushan.vscode-paste-image` — for pasting images into Markdown

VS Code settings (`.vscode/settings.json`):
- Paste images to `${currentFileDir}/assets/images`
- Markdown format on save: disabled

---

## Git Conventions

- Do not commit generated files (`scripts/courses-data.js` is auto-generated)
- Do not commit large binary files (e.g., `.epub` files)
- Course content in `courses/` is structured data, not code

---

## Common Tasks

### Adding a new course
1. Create `courses/[course-name]/outline.md` with frontmatter
2. Create `courses/[course-name]/[lesson-name]/outline.md`
3. Run `npm run build` to regenerate `courses-data.js`

### Modifying the build script
The build script (`build.js`) uses `gray-matter` to parse frontmatter and generates `courses-data.js` — modify with care as it affects all pages.

### Adding a new script
Place in `scripts/` directory, use ES module syntax, import as needed.
