# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

**No linting or testing commands are currently configured.**

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
- CSS custom properties for theming are defined in `:root` (see `styles/main.css`)
- Dark theme colors: background `#0a0a0a`, cards `rgba(255,255,255,0.05)`

---

## Project Architecture

```
CourseHub/
├── build.js              # Build script (generates courses-data.js)
├── scripts/
│   ├── main.js           # Course list page logic
│   ├── course.js         # Course detail page logic
│   ├── markdown-renderer.js  # Markdown parsing utilities
│   ├── laser-pointer.js  # Laser pointer feature (class-based)
│   └── courses-data.js   # Auto-generated (do not edit)
├── courses/              # Course content (Markdown files)
│   └── [course-name]/
│       ├── outline.md    # Course metadata (YAML frontmatter)
│       └── [lesson-name]/
│           ├── outline.md    # Lesson metadata
│           ├── 教案.md        # Lesson content (Markdown)
│           ├── 作业.md        # Homework (optional)
│           └── index.html    # Interactive PPT (optional)
├── skills/               # Teaching guidelines for content generation
│   ├── 教案生成.md
│   ├── PPT生成.md
│   └── 交互课件生成.md
├── styles/
│   └── main.css
└── index.html, course.html, lesson.html
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

### Adding a new course

1. Create `courses/[course-name]/outline.md` with frontmatter
2. Create `courses/[course-name]/[lesson-name]/outline.md`
3. Add `教案.md` for lesson content
4. Run `npm run build` to regenerate `courses-data.js`

---

## Teaching Content Guidelines

When creating lesson plans or PPTs, follow the guidelines in `skills/`:

### 教案生成.md (Lesson Plans)
- Use simple, accessible language for beginners
- Use life analogies for programming concepts (see analogy table)
- Preferred terms: 显示 (not 输出), 记住/存放 (not 存储), 读入 (not 输入)

### PPT生成.md (Interactive PPTs)
- Target audience: zero-experience primary/middle school students
- Must include interactive elements: drag-and-drop, quizzes, code execution visualization
- Use instant feedback with animations (correct: pulse + particles, wrong: shake)
- Include scoring system with streak tracking
- Color scheme: `#0a0a0a` background, `#60a5fa` accent, `#34d399` success

### 交互课件生成.md (Interactive Courseware)
- Full-screen flexbox layout with header, content, and nav-bar
- Tech stack: TailwindCSS (CDN), native HTML5 Drag and Drop, vanilla JS
- Output path: `courses/课程名/课时名/index.html`

---

## Git Conventions

- Do not commit generated files (`scripts/courses-data.js` is auto-generated)
- Do not commit large binary files (e.g., `.epub` files)
