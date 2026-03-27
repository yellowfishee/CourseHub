# CourseHub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static course website with Markdown rendering, hierarchical navigation, and laser pointer functionality for HTML PPT presentations.

**Architecture:** Single-page static site with vanilla HTML/CSS/JS. A Node.js build script scans the `courses/` directory and generates navigation data. Markdown is rendered client-side via marked.js CDN.

**Tech Stack:** Vanilla HTML/CSS/JS, Node.js (build script), marked.js (Markdown), gray-matter (YAML front matter parsing in build script)

---

## File Structure

```
CourseHub/
├── index.html                    # Homepage with course list
├── build.js                      # Build script (Node.js)
├── package.json                   # Node dependencies
├── styles/
│   └── main.css                  # Global styles
├── scripts/
│   ├── main.js                   # Entry point, navigation logic
│   ├── markdown-renderer.js     # Markdown → HTML rendering
│   ├── laser-pointer.js         # Laser pointer component
│   └── course-scanner.js        # Scan courses/ and generate nav
├── courses/                     # Course content (user-managed)
│   └── (course folders go here)
└── docs/superpowers/plans/      # This plan
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `CourseHub/package.json`
- Create: `CourseHub/index.html`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "coursehub",
  "version": "1.0.0",
  "description": "Course presentation website with Markdown and HTML PPT support",
  "scripts": {
    "build": "node build.js"
  },
  "dependencies": {
    "gray-matter": "^4.0.3"
  }
}
```

- [ ] **Step 2: Create index.html with basic structure**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CourseHub</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <header id="site-header">
        <h1>CourseHub</h1>
        <p>教学课程展示平台</p>
    </header>

    <main id="course-list">
        <!-- Courses rendered here by build script -->
    </main>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script type="module" src="scripts/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/mac/github/CourseHub
git init
git add package.json index.html
git commit -m "feat: scaffold project with index.html and package.json"
```

---

## Task 2: Global Styles

**Files:**
- Create: `CourseHub/styles/main.css`

- [ ] **Step 1: Create main.css with basic styling**

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #64748b;
    --bg-color: #f8fafc;
    --card-bg: #ffffff;
    --text-color: #1e293b;
    --border-radius: 8px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
}

#site-header {
    background: linear-gradient(135deg, var(--primary-color), #60a5fa);
    color: white;
    padding: 3rem 2rem;
    text-align: center;
}

#site-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

#course-list {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.course-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
}

.course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.course-card h2 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.course-card p {
    color: var(--secondary-color);
    font-size: 0.9rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/main.css
git commit -m "feat: add global styles with course card grid layout"
```

---

## Task 3: Build Script

**Files:**
- Create: `CourseHub/build.js`

- [ ] **Step 1: Create build.js**

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const COURSES_DIR = path.join(__dirname, 'courses');
const OUTPUT_FILE = path.join(__dirname, 'scripts', 'courses-data.js');

function scanCourses() {
    const courses = [];

    if (!fs.existsSync(COURSES_DIR)) {
        fs.mkdirSync(COURSES_DIR, { recursive: true });
        return courses;
    }

    const courseFolders = fs.readdirSync(COURSES_DIR).filter(name => {
        return fs.statSync(path.join(COURSES_DIR, name)).isDirectory();
    });

    for (const folder of courseFolders) {
        const coursePath = path.join(COURSES_DIR, folder);
        const outlinePath = path.join(coursePath, 'outline.md');

        let courseData = {
            slug: folder,
            title: folder,
            description: '',
            lessons: []
        };

        if (fs.existsSync(outlinePath)) {
            const content = fs.readFileSync(outlinePath, 'utf-8');
            const parsed = matter(content);
            courseData.title = parsed.data.title || folder;
            courseData.description = parsed.data.description || '';
        }

        const lessonFolders = fs.readdirSync(coursePath).filter(name => {
            return fs.statSync(path.join(coursePath, name)).isDirectory();
        });

        for (const lessonFolder of lessonFolders) {
            const lessonPath = path.join(coursePath, lessonFolder);
            const lessonOutlinePath = path.join(lessonPath, 'outline.md');
            const lessonMetaPath = path.join(lessonPath, 'meta.json');

            let lessonData = {
                slug: lessonFolder,
                title: lessonFolder,
                hasOutline: fs.existsSync(lessonOutlinePath),
                hasMeta: fs.existsSync(lessonMetaPath)
            };

            if (fs.existsSync(lessonOutlinePath)) {
                const content = fs.readFileSync(lessonOutlinePath, 'utf-8');
                const parsed = matter(content);
                lessonData.title = parsed.data.title || lessonFolder;
                lessonData.description = parsed.data.description || '';
            }

            courseData.lessons.push(lessonData);
        }

        courses.push(courseData);
    }

    return courses;
}

function generateCoursesData() {
    const courses = scanCourses();
    const jsContent = `// Auto-generated by build.js
const COURSES_DATA = ${JSON.stringify(courses, null, 2)};
export default COURSES_DATA;
`;
    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf-8');
    console.log(`Generated ${OUTPUT_FILE} with ${courses.length} courses`);
}

generateCoursesData();
```

- [ ] **Step 2: Install dependencies and run build**

```bash
npm install
node build.js
```

- [ ] **Step 3: Commit**

```bash
git add build.js package-lock.json
git commit -m "feat: add build script that scans courses and generates navigation data"
```

---

## Task 4: Main Script - Navigation & Rendering

**Files:**
- Create: `CourseHub/scripts/main.js`
- Create: `CourseHub/scripts/markdown-renderer.js`

- [ ] **Step 1: Create markdown-renderer.js**

```javascript
export function renderMarkdown(content) {
    if (typeof marked !== 'undefined') {
        return marked.parse(content);
    }
    return '<p>Markdown renderer not loaded</p>';
}

export function parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (!match) {
        return { data: {}, content };
    }

    const data = {};
    const yamlContent = match[1];
    const body = match[2];

    yamlContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            data[key.trim()] = valueParts.join(':').trim();
        }
    });

    return { data, content: body };
}
```

- [ ] **Step 2: Create main.js**

```javascript
import COURSES_DATA from './courses-data.js';
import { renderMarkdown } from './markdown-renderer.js';

function renderCourseList() {
    const container = document.getElementById('course-list');
    if (!container) return;

    if (COURSES_DATA.length === 0) {
        container.innerHTML = '<p>暂无课程</p>';
        return;
    }

    container.innerHTML = COURSES_DATA.map(course => `
        <a href="course.html?slug=${course.slug}" class="course-card">
            <h2>${course.title}</h2>
            <p>${course.description || '暂无描述'}</p>
            <span>${course.lessons.length} 课时</span>
        </a>
    `).join('');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCourseList);
} else {
    renderCourseList();
}

window.CourseHub = {
    renderMarkdown,
    COURSES_DATA
};
```

- [ ] **Step 3: Commit**

```bash
git add scripts/main.js scripts/markdown-renderer.js
git commit -m "feat: add main script with navigation and markdown renderer"
```

---

## Task 5: Laser Pointer Component

**Files:**
- Create: `CourseHub/scripts/laser-pointer.js`

- [ ] **Step 1: Create laser-pointer.js**

```javascript
export class LaserPointer {
    constructor(container) {
        this.container = container;
        this.element = null;
        this.isActive = false;
        this.fadeTimeout = null;
        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.id = 'laser-pointer';
        this.element.style.cssText = `
            position: fixed;
            width: 24px;
            height: 24px;
            background: radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0.4) 40%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.1s;
            display: none;
        `;
        document.body.appendChild(this.element);

        this.container.addEventListener('mousedown', this.show.bind(this));
        this.container.addEventListener('mouseup', this.hide.bind(this));
        this.container.addEventListener('mouseleave', this.hide.bind(this));
        this.container.addEventListener('mousemove', this.move.bind(this));
    }

    show(e) {
        this.isActive = true;
        this.element.style.display = 'block';
        this.move(e);
        this.element.style.opacity = '1';
        if (this.fadeTimeout) {
            clearTimeout(this.fadeTimeout);
            this.fadeTimeout = null;
        }
    }

    hide() {
        if (!this.isActive) return;
        this.isActive = false;
        this.element.style.opacity = '0';
        this.fadeTimeout = setTimeout(() => {
            this.element.style.display = 'none';
        }, 800);
    }

    move(e) {
        if (!this.isActive) return;
        this.element.style.left = `${e.clientX - 12}px`;
        this.element.style.top = `${e.clientY - 12}px`;
    }

    destroy() {
        this.container.removeEventListener('mousedown', this.show);
        this.container.removeEventListener('mouseup', this.hide);
        this.container.removeEventListener('mouseleave', this.hide);
        this.container.removeEventListener('mousemove', this.move);
        this.element.remove();
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add scripts/laser-pointer.js
git commit -m "feat: add laser pointer component with fade-out animation"
```

---

## Task 6: Course Outline Page Template

**Files:**
- Create: `CourseHub/course.html`

- [ ] **Step 1: Create course.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课程概览 - CourseHub</title>
    <link rel="stylesheet" href="styles/main.css">
    <style>
        #course-outline {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        #course-outline h1 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        #course-outline .description {
            color: var(--secondary-color);
            margin-bottom: 2rem;
        }
        #lesson-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .lesson-card {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            padding: 1rem 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .lesson-card a {
            text-decoration: none;
            color: var(--text-color);
            flex: 1;
        }
        .lesson-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .back-link {
            display: inline-block;
            margin-bottom: 1rem;
            color: var(--primary-color);
            text-decoration: none;
        }
    </style>
</head>
<body>
    <header id="site-header">
        <h1>CourseHub</h1>
    </header>

    <main id="course-outline">
        <a href="index.html" class="back-link">← 返回课程列表</a>
        <div id="course-content"></div>
        <div id="lesson-list"></div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script type="module" src="scripts/main.js"></script>
    <script>
        const params = new URLSearchParams(window.location.search);
        const courseSlug = params.get('slug');
        const course = COURSES_DATA.find(c => c.slug === courseSlug);

        if (course) {
            document.title = `${course.title} - CourseHub`;
            document.getElementById('course-content').innerHTML = `
                <h1>${course.title}</h1>
                <p class="description">${course.description}</p>
            `;
            document.getElementById('lesson-list').innerHTML = course.lessons.map(lesson => `
                <div class="lesson-card">
                    <a href="lesson.html?course=${course.slug}&lesson=${lesson.slug}">
                        <span>${lesson.title}</span>
                    </a>
                </div>
            `).join('');
        } else {
            document.getElementById('course-content').innerHTML = '<p>课程未找到</p>';
        }
    </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add course.html
git commit -m "feat: add course outline page template"
```

---

## Task 7: Lesson Page with PPT Embed & Laser Pointer

**Files:**
- Create: `CourseHub/lesson.html`

- [ ] **Step 1: Create lesson.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课时 - CourseHub</title>
    <link rel="stylesheet" href="styles/main.css">
    <style>
        #lesson-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 1rem;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 1rem;
            color: var(--primary-color);
            text-decoration: none;
        }
        #lesson-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            height: calc(100vh - 150px);
        }
        #lesson-content {
            background: var(--card-bg);
            border-radius: var(--border-radius);
            padding: 1.5rem;
            overflow-y: auto;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        #ppt-container {
            background: #000;
            border-radius: var(--border-radius);
            overflow: hidden;
            position: relative;
        }
        #ppt-iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        @media (max-width: 900px) {
            #lesson-layout {
                grid-template-columns: 1fr;
                height: auto;
            }
            #ppt-container {
                height: 50vh;
            }
        }
    </style>
</head>
<body>
    <header id="site-header">
        <h1>CourseHub</h1>
    </header>

    <main id="lesson-container">
        <a href="course.html" class="back-link">← 返回课程</a>
        <div id="lesson-layout">
            <div id="lesson-content"></div>
            <div id="ppt-container">
                <iframe id="ppt-iframe" allow="fullscreen"></iframe>
            </div>
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script type="module">
        import { LaserPointer } from './scripts/laser-pointer.js';

        const params = new URLSearchParams(window.location.search);
        const courseSlug = params.get('course');
        const lessonSlug = params.get('lesson');

        const course = COURSES_DATA.find(c => c.slug === courseSlug);
        const lesson = course?.lessons.find(l => l.slug === lessonSlug);

        if (lesson) {
            document.title = `${lesson.title} - ${course.title} - CourseHub`;

            // Load lesson markdown
            const lessonPath = `courses/${courseSlug}/${lessonSlug}/教案.md`;
            fetch(lessonPath)
                .then(r => r.text())
                .then(content => {
                    document.getElementById('lesson-content').innerHTML = marked.parse(content);
                })
                .catch(() => {
                    document.getElementById('lesson-content').innerHTML = '<p>教案加载失败</p>';
                });

            // Load PPT iframe
            document.getElementById('ppt-iframe').src = `${lessonPath.replace('教案.md', '')}index.html`;
        } else {
            document.getElementById('lesson-content').innerHTML = '<p>课时未找到</p>';
        }

        // Initialize laser pointer on PPT container
        const pptContainer = document.getElementById('ppt-container');
        new LaserPointer(pptContainer);
    </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add lesson.html
git commit -m "feat: add lesson page with split view and laser pointer"
```

---

## Task 8: Sample Course (for testing)

**Files:**
- Create: `CourseHub/courses/01-Python入门/outline.md`
- Create: `CourseHub/courses/01-Python入门/01-变量与类型/教案.md`
- Create: `CourseHub/courses/01-Python入门/01-变量与类型/index.html`

- [ ] **Step 1: Create sample course outline**

```markdown
---
title: Python入门
description: 从零开始学习Python基础语法
---

# Python 入门课程

这是一门面向零基础学员的Python入门课程。通过本课程，你将掌握Python的基本语法和编程思想。

## 课程大纲

本课程包含以下课时：

| 课时 | 主题 |
|------|------|
| 01 | 变量与类型 |
```

- [ ] **Step 2: Create sample lesson markdown**

```markdown
# 变量与类型

## 学习目标

- 理解变量的概念
- 掌握Python的基本数据类型
- 学会使用print()函数

## 内容

### 变量

变量是存储数据的容器。在Python中，无需声明变量类型，直接赋值即可：

```python
name = "Alice"
age = 25
```

### 基本数据类型

- 字符串 (str)
- 整数 (int)
- 浮点数 (float)
- 布尔值 (bool)
```

- [ ] **Step 3: Create sample HTML PPT**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>变量与类型</title>
    <style>
        body { font-family: sans-serif; margin: 0; padding: 2rem; }
        h1 { color: #3b82f6; }
    </style>
</head>
<body>
    <h1>变量与类型</h1>
    <p>Python 入门第一课</p>
</body>
</html>
```

- [ ] **Step 4: Rebuild to include sample course**

```bash
node build.js
```

- [ ] **Step 5: Commit sample content**

```bash
git add courses/
git commit -m "feat: add sample Python course for testing"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - [x] Homepage with course list - Task 1, 4
   - [x] Course outline page - Task 6
   - [x] Lesson page with PPT embed - Task 7
   - [x] Laser pointer (long-press red dot, fade out) - Task 5
   - [x] Markdown rendering - Task 4
   - [x] Build script for navigation - Task 3
   - [x] YAML front matter support - Task 3
   - [x] Static deployment ready - all files static

2. **Placeholder scan:** No TBD/TODO found

3. **Type consistency:** All function names consistent across tasks

---

**Plan complete.** Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
