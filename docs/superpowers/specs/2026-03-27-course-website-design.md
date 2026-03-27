# CourseHub 设计方案

## 概述

一个用于展示教学教案和 HTML PPT 的静态网站，支持 Markdown 渲染、层级式课程导航、激光笔演示功能，可部署至 GitHub Pages / Gitee Pages。

---

## 技术选型

- **前端**：Vanilla HTML/CSS/JS，无框架依赖
- **Markdown 渲染**：marked.js（CDN 引入）
- **构建工具**：Node.js 轻量脚本
- **部署**：GitHub Pages / Gitee Pages（纯静态，无需服务器）

---

## 项目结构

```
CourseHub/
├── index.html          # 首页（介绍 + 课程列表）
├── build.js            # 构建脚本
├── styles/
│   └── main.css        # 全局样式
├── scripts/
│   └── main.js         # 全局脚本（激光笔等）
└── courses/            # 课程根目录
    ├── python-101/     # 课程文件夹
    │   ├── outline.md  # 课程大纲
    │   ├── meta.json   # 可选：课程元数据
    │   ├── 01-变量与类型/
    │   │   ├── outline.md   # 课时大纲（可选）
    │   │   ├── 教案.md      # 教案内容
    │   │   └── index.html  # PPT 页面
    │   └── 02-函数定义/
    │       ├── 教案.md
    │       └── index.html
    └── javascript-201/
        └── ...
```

### 文件名规范

| 类型 | 命名格式 | 说明 |
|------|---------|------|
| 课程文件夹 | `XX-课程名` | XX 为两位数字序号 |
| 课时文件夹 | `XX-课时名` | XX 为两位数字序号 |
| 教案文件 | `教案.md` | 必需 |
| PPT 文件 | `index.html` | 必需 |
| 课程大纲 | `outline.md` | 必需，渲染成课程介绍页 |
| 课时大纲 | `outline.md` | 可选 |
| 元数据 | `meta.json` | 可选 |

---

## outline.md 语法约定

采用 **YAML front matter + 标准 Markdown** 格式，方便快速编写。

### 课程 outline.md 示例

```markdown
---
title: Python入门
description: 从零开始学习Python基础语法
---

# 课程介绍

这是一门面向零基础学员的Python入门课程...

## 课程大纲

| 课时 | 主题 |
|------|------|
| 01 | 变量与类型 |
| 02 | 函数定义 |
```

### 课时 outline.md 示例（可选）

```markdown
---
title: 变量与类型
description: 理解Python中的基本数据类型
---

# 变量与类型

本节课学习Python的基本数据类型...
```

### 语法说明

| 元素 | 格式 | 说明 |
|------|------|------|
| 元数据 | `---` 包裹的 YAML | 解析为 title、description 等 |
| 课时表格 | `\| 课时 \| 主题 \|` | 构建脚本识别并生成导航 |
| 普通内容 | 标准 Markdown | 直接渲染为 HTML |

**渲染规则：**
- `title` 优先使用 front matter 中的值，其次取文件夹名
- 课时表格会被提取，用于生成课时导航
- 其余内容直接渲染为 HTML

---

## 核心页面

### 1. 首页 (`index.html`)

- 顶部：花哨的介绍区域（标题、副标题、可自定义装饰元素）
- 下方：根据 `courses/` 目录自动生成的课程卡片列表
- 每个课程卡片 → 点击进入课程概览页

### 2. 课程概览页 (`courses/[course-slug]/outline.html`)

- 渲染自 `outline.md`
- 包含课程介绍、课时目录导航
- 课时列表：每课显示标题 + 简介，点击进入课时

### 3. 课时页

- 左侧/上方：渲染后的 `教案.md` 内容
- 右侧/下方：iframe 嵌入 `index.html`（PPT 容器）
- 支持激光笔功能

---

## 激光笔功能

- **触发方式**：鼠标长按（mousedown 出现，mouseup/mouseleave 缓慢消失）
- **视觉效果**：简单红色半透明圆形光斑（20-30px）
- **消失动画**：松开后 0.8s 内渐隐
- **层级**：始终在最顶层，不影响页面交互

---

## 构建流程

```bash
# 开发阶段
node build.js        # 扫描 courses/ 目录，生成导航 + 页面

# 提交部署
git push             # 手动推送到 GitHub / Gitee
```

### 构建脚本功能

1. 扫描 `courses/` 目录
2. 读取每个课程的 `meta.json` 和 `outline.md`
3. 生成 `courses.json`（课程导航数据）
4. 生成各课程的 `outline.html` 页面
5. 生成首页的课程列表

---

## 内容更新流程（半自动模式）

1. 按规范创建课程/课时文件夹
2. 放入 `教案.md` 和 `index.html`
3. 运行 `node build.js` 生成导航
4. 提交代码

---

## 文件约定总览

| 文件 | 作用 | 是否必需 |
|------|------|---------|
| `courses/XX-课程名/outline.md` | 课程介绍页内容 | 是 |
| `courses/XX-课程名/meta.json` | 课程标题、描述 | 否 |
| `courses/XX-课程名/XX-课时名/教案.md` | 课时教案 | 是 |
| `courses/XX-课程名/XX-课时名/index.html` | PPT 内容 | 是 |
| `courses/XX-课程名/XX-课时名/outline.md` | 课时大纲 | 否 |

---

## 部署方式

- **GitHub Pages**：推送代码到 `gh-pages` 分支或 `main` 分支的 `/docs` 目录
- **Gitee Pages**：类似 GitHub Pages 的操作
- 均为纯静态部署，无需服务器，无需备案
