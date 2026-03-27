# CourseHub AI Skills 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 创建 CourseHub AI 辅助教学生成 Skills，包含教案生成、PPT生成、图表生成规范。

**Architecture:** 三个 Markdown 文件作为 Skill 配置模板，定义生成规范和触发方式。

**Tech Stack:** Markdown + D2/Mermaid/Draw.io + HTML/CSS/JS

---

## 文件结构

```
CourseHub/skills/
├── 教案生成.md        # 教案编写规范 + 模板
├── PPT生成.md         # HTML PPT 编写规范（乔布斯风）
└── 图表生成.md        # 可视化工具选择策略
```

---

## Task 1: 创建图表生成 Skill

**Files:**
- Create: `CourseHub/skills/图表生成.md`

- [ ] **Step 1: 创建图表生成规范文件**

```markdown
# 图表生成规范

## 图表选择策略

根据内容类型选择合适的可视化工具：

| 内容类型 | 推荐工具 | 说明 |
|---------|---------|------|
| 代码执行流程 | D2 | 清晰展示执行顺序 |
| 概念/架构图 | Mermaid | 快速生成 |
| 复杂结构图 | Draw.io XML | 可导出编辑 |
| 数组/排序/动态演示 | HTML/CSS/JS 动画 | 一步一步看过程 |
| 语法交互（变量/判断/循环） | HTML/CSS/JS 交互 | 点击/输入看每一步结果 |

## 工具使用规范

### D2 使用

\`\`\`d2
shape: flowchart
direction: left

code_start -> read_line -> parse -> execute -> output
\`\`\`

### Mermaid 使用

\`\`\`mermaid
flowchart LR
    A[开始] --> B{条件判断}
    B -->|是| C[执行代码]
    B -->|否| D[跳过]
\`\`\`

### HTML/CSS/JS 动画示例

```html
<div id="array-demo">
  <div class="item highlight">5</div>
  <div class="item">3</div>
  <div class="item">8</div>
</div>
<style>
.highlight { background: #3b82f6; color: white; }
</style>
<script>
// 数组遍历动画逻辑
</script>
```

## 典型场景

### 变量赋值
- 使用 HTML 输入框，键入代码即时显示结果

### if/else 判断
- 流程图 + 点击分支看执行结果

### for 循环
- 动画展示变量变化、循环计数器

### 数组遍历
- 指针移动 + 高亮当前元素

### 冒泡排序
- 逐帧动画展示交换过程

## 生成流程

1. 理解内容需求
2. 选择合适工具
3. 生成代码/语法
4. 插入到教案或 PPT
```

- [ ] **Step 2: Commit**

```bash
git add skills/图表生成.md
git commit -m "feat: add chart generation skill for diagram tools selection"
```

---

## Task 2: 创建教案生成 Skill

**Files:**
- Create: `CourseHub/skills/教案生成.md`

- [ ] **Step 1: 创建教案生成规范文件**

```markdown
# 教案生成规范

## 触发方式

- 命令: `/生成教案 课时名`
- 对话: "帮我写一节关于 XX 的教案"

## 半自动流程

1. 用户提供授课思路
2. AI 生成预览
3. 用户确认/修改
4. AI 写入文件

## YAML Front Matter

\`\`\`yaml
---
title: 课时名称
description: 简短描述
prerequisites: 前置知识（可选）
---
\`\`\`

## Markdown 结构

\`\`\`markdown
# 标题

## 学习目标
- 掌握 xxx
- 理解 xxx

## 内容

### 概念讲解
通俗易懂的概念说明...

### 代码示例
\`\`\`python
# 代码
\`\`\`

### 交互演示
[嵌入 HTML/CSS/JS 交互代码]

## 练习题
1. 题目描述
2. 题目描述

## 小结
- 回顾重点
\`\`\`

## 风格要求

- **通俗易懂** — 用常见例子解释抽象概念
- **循序渐进** — 从简单到复杂
- **代码注释** — 关键行添加注释说明
- **图文并茂** — 适时插入图表和交互

## 图表集成

在需要的位置插入图表：

\`\`\`html
<!-- D2 流程图 -->
<div class="diagram d2">
    <pre class="d2-code">
shape: flowchart
direction: left
    input -> process -> output
    </pre>
</div>

<!-- Mermaid 图 -->
<div class="diagram mermaid">
    ```mermaid
    flowchart LR
        A --> B
    ```
</div>

<!-- HTML/CSS/JS 交互 -->
<div class="interactive-demo" id="demo-01">
    <input type="text" id="code-input" placeholder="输入代码...">
    <div id="output"></div>
</div>
\`\`\`

## 文件输出

输出路径: `courses/课程名/课时名/教案.md`
```

- [ ] **Step 2: Commit**

```bash
git add skills/教案生成.md
git commit -m "feat: add lesson plan generation skill with template"
```

---

## Task 3: 创建 PPT 生成 Skill

**Files:**
- Create: `CourseHub/skills/PPT生成.md`

- [ ] **Step 1: 创建 PPT 生成规范文件**

```markdown
# PPT 生成规范

## 触发方式

- 命令: `/生成PPT 课时名`
- 对话: "帮我生成关于 XX 的 PPT"

## 视觉规范

| 项目 | 规范 |
|------|------|
| 比例 | 16:9 横屏 |
| 背景 | #000000 或 #0a0a0a + 模糊光斑动画 |
| 主文字 | #ffffff |
| 辅助文字 | #9ca3af |
| 中文字体 | HarmonyOS Sans SC / 思源黑体 |
| 英文字体 | Inter / Roboto |
| 标题字重 | font-bold |
| 正文字重 | font-light / font-normal |

## 交互要求

- 键盘 ← → 翻页
- 底部进度导航条
- 平滑切换动画

## 技术栈

- TailwindCSS（国内 CDN）
- 复杂页面使用 Vue3（CDN）
- 单个 HTML 文件，可直接打开运行

## 严禁行为

- 堆字 / 密集排版
- 花哨配色
- 复杂图表（用 HTML/CSS/JS 代替）
- 横屏比例偏离
- 偏离极简科技风

## 默认规则

- 未指定页数：自动生成 8~20 页
- 未指定风格：默认乔布斯风

## HTML PPT 模板

\`\`\`html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课时名称</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');

        body {
            font-family: 'Inter', 'HarmonyOS Sans SC', sans-serif;
            background: #0a0a0a;
            overflow: hidden;
        }

        /* 背景光斑动画 */
        .bg-blur {
            position: fixed;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.3;
            animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(50px, 50px); }
        }

        /* 页面容器 */
        .slide {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 4rem;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.5s ease;
        }

        .slide.active {
            opacity: 1;
            transform: translateX(0);
        }

        /* 进度条 */
        .progress-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            transition: width 0.3s ease;
        }

        /* 进度点 */
        .progress-dots {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #334155;
            cursor: pointer;
        }

        .dot.active {
            background: #3b82f6;
        }
    </style>
</head>
<body>
    <!-- 背景光斑 -->
    <div class="bg-blur" style="top: -200px; left: -200px; background: #3b82f6;"></div>
    <div class="bg-blur" style="bottom: -200px; right: -200px; background: #8b5cf6; animation-delay: -4s;"></div>

    <!-- 页面内容 -->
    <div id="slides-container">
        <div class="slide active">
            <h1 class="text-5xl font-bold text-white mb-4">标题</h1>
            <p class="text-xl text-gray-400">副标题</p>
        </div>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar" id="progress"></div>
    <div class="progress-dots" id="dots"></div>

    <script>
        // 键盘翻页
        let current = 0;
        const slides = document.querySelectorAll('.slide');
        const total = slides.length;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                next();
            } else if (e.key === 'ArrowLeft') {
                prev();
            }
        });

        function next() {
            if (current < total - 1) {
                slides[current].classList.remove('active');
                slides[++current].classList.add('active');
                updateProgress();
            }
        }

        function prev() {
            if (current > 0) {
                slides[current].classList.remove('active');
                slides[--current].classList.add('active');
                updateProgress();
            }
        }

        function updateProgress() {
            document.getElementById('progress').style.width =
                ((current + 1) / total * 100) + '%';
        }
    </script>
</body>
</html>
\`\`\`

## 文件输出

输出路径: `courses/课程名/课时名/index.html`
```

- [ ] **Step 2: Commit**

```bash
git add skills/PPT生成.md
git commit -m "feat: add PPT generation skill with Jobs-style template"
```

---

## Task 4: 创建示例内容

**Files:**
- Modify: `CourseHub/courses/01-Python入门/01-变量与类型/教案.md`
- Modify: `CourseHub/courses/01-Python入门/01-变量与类型/index.html`

- [ ] **Step 1: 更新示例教案（包含交互图表）**

根据规范，更新现有示例教案，加入 HTML/CSS/JS 交互演示。

- [ ] **Step 2: 更新示例 PPT**

根据乔布斯风规范，更新现有示例 PPT。

- [ ] **Step 3: Commit**

```bash
git add courses/01-Python入门/01-变量与类型/
git commit -m "feat: update sample lesson with interactive demos and new PPT style"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - [x] 图表选择策略 - Task 1
   - [x] 教案生成规范 - Task 2
   - [x] PPT 生成规范 - Task 3
   - [x] 乔布斯风 PPT 模板 - Task 3
   - [x] 示例内容更新 - Task 4

2. **Placeholder scan:** 无 TBD/TODO

3. **Type consistency:** N/A（文档文件）

---

**Plan complete.** 四个 Task，均为创建文档文件。

---

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session, batch execution

**Which approach?**
