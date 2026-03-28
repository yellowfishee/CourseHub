# CourseHub AI 辅助教学生成 Skills 设计

## 概述

为 CourseHub 项目创建 AI 辅助生成 Skills，帮助教师快速生成通俗易懂的教案和 PPT，支持多种图表和交互式代码演示。

**核心理念：通俗易懂 + 拆解思维**

---

## 三大核心原则

### 1. 通俗易懂（最重要！）

**面向零基础初学者，避免专业词汇：**

| 应该用的词 | 避免用的词 |
|-----------|-----------|
| 命令、指令 | 函数（除非解释清楚） |
| 显示出来、打印 | 输出 |
| 记住、存放 | 赋值、存储 |
| 拆解问题 | 拆分问题 |
| 实际上在做一件什么事 | 本质是什么 |
| 部件、组件 | 模块 |
| 一件什么事 | 什么操作 |

**每讲一个概念，必须用生活类比：**

```
概念 → 生活例子 → 代码实现
```

**常用生活类比库：**

| 概念 | 生活类比 |
|------|---------|
| 程序/代码 | 食谱、说明书 |
| 计算机三大步 | 餐厅服务员（接单→做菜→上菜） |
| 函数/命令 | 遥控器按钮 |
| 变量 | 储物柜/便利贴 |
| 循环 | 重复做同一件事 |
| 判断 | 遇到岔路口做选择 |

### 2. 编程思维流程（问题拆解）

```
遇到问题
  → 拆解问题（拆成小问题）
    → 再拆解
      → 直到每个小问题都能用一个命令解决
```

**拆解原则：**
- 拆到"**一句话能说清楚**"为止
- 拆到"**一个命令能解决**"为止

### 3. 生活类比

每个概念都需要有生活类比，让学生"哦！我懂了！"

---

## 核心流程

```
用户: 提供授课思路（讲解逻辑 + 题目安排）
  ↓
AI: 设计通俗易懂的例子 + 生活类比
  ↓
判断需要的可视化类型:
  ├─ 代码执行流程 → D2
  ├─ 概念/流程图 → Mermaid
  ├─ 复杂结构图 → Draw.io XML
  ├─ 动态演示（数组/排序） → HTML/CSS/JS 动画
  └─ 语法交互 → HTML/CSS/JS 交互
  ↓
生成教案.md（含通俗解释 + 生活类比 + 拆解过程）
  ↓
生成 PPT（含拆解过程 + 代码 + 一句话总结）
  ↓
用户: 预览 + 修改
  ↓
完成
```

---

## Skill 文件结构

```
CourseHub/skills/
├── 教案生成.md        # 教案编写规范 + 模板（通俗易懂 + 生活类比）
├── PPT生成.md         # HTML PPT 编写规范（交互式全屏布局）
├── 交互课件生成.md     # 交互式课件生成规范（拖拽/测验/代码执行）
└── 图表生成.md        # 可视化工具选择策略
```

---

## 图表选择策略

| 内容类型 | 推荐工具 | 说明 |
|---------|---------|------|
| 代码执行流程 | D2 | 清晰展示执行顺序 |
| 概念/流程图 | Mermaid | 展示拆解过程 |
| 复杂结构图 | Draw.io XML | 可导出编辑 |
| 数组/排序/动态演示 | HTML/CSS/JS 动画 | 一步一步看过程 |
| 语法交互 | HTML/CSS/JS 交互 | 点击/输入看结果 |

### 典型场景示例

- **变量赋值** → 生活类比：便利贴/储物柜 + HTML 输入框交互
- **if/else 判断** → 拆解图：岔路口 → 两个选择 + 点击分支看结果
- **for 循环** → 拆解图：大问题 → 重复执行 + 动画展示
- **数组遍历** → 拆解图：逐个处理 + 指针移动动画
- **冒泡排序** → 逐帧动画展示交换过程

---

## 教案生成规范

### 核心理念

每个知识点的教案必须包含：

1. **通俗解释** — 一句话 + 生活类比
2. **拆解训练** — 通过例子展示如何把大问题拆成小问题
3. **代码示例** — 最简单的例子 + 注释

### YAML Front Matter

```yaml
---
title: 课时名称
description: 简短描述
prerequisites: 前置知识（可选）
---
```

### Markdown 结构

```markdown
# 标题

## 学习目标

- 理解 xxx 是什么（能用通俗的话解释）
- 会用 xxx（能写出代码）
- 学会拆解问题（遇到问题能分解）

## 内容

### 引入：从一个问题开始
[用一个生活中的问题引入，让学生思考]

### 概念讲解
**xxx 是什么？**
- 通俗解释：（一句话 + 生活类比）
- 类比：就像______一样

### 代码示例
```python
# 最简单的例子
```
**解释**：这行代码让计算机做了什么？

### 练习拆解
[展示如何把一个具体问题拆解后用代码解决]

### 交互演示
[嵌入 HTML/CSS/JS 交互代码]

## 练习题
1. 题目（用具体问题，让学生先拆解再写代码）
2. 题目

## 小结
- 今天学了什么
- 用通俗的话解释一下
```

### 风格要求

- **通俗易懂** — 零基础也能看懂
- **生活类比** — 每个概念都有生活例子
- **拆解思维** — 通过例子训练"大问题拆成小问题"
- **循序渐进** — 从简单到复杂
- **代码注释** — 关键行添加注释说明

---

## PPT 生成规范

### 核心理念

**每页 PPT 都要问：**
- 零基础的人能看懂吗？
- 有没有生活类比？
- 专业词汇有没有解释？

**PPT 结构：**

```
课程开始：[用一个生活问题引入]
  ↓
每个知识点：
  1. 先展示拆解过程（怎么把问题变小）
  2. 再展示代码（怎么用命令解决）
  3. 最后一句话总结（记住什么）
  ↓
课程结束：[用通俗的话总结今天学了什么]
```

### 全屏布局规范（必须遵守）

PPT 必须使用全屏 flexbox 布局，确保充分利用视口：

```css
/* 全屏容器 */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.header {
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.content {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.step-container {
    flex: 1;
    padding: 1.5rem;
    padding-bottom: 5rem; /* 防止内容被导航遮挡 */
}
.nav-bar {
    padding: 0.75rem 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
}
```

### 视觉规范

| 项目 | 规范 |
|------|------|
| 比例 | 全屏布局，不限制宽高比 |
| 背景 | #0a0a0a + 模糊光斑动画 或 渐变背景 |
| 主文字 | #ffffff |
| 辅助文字 | #9ca3af |
| 中文字体 | HarmonyOS Sans SC / 思源黑体 |
| 英文字体 | Inter / Roboto |

### 交互要求

- 键盘 ← → 翻页
- 底部进度导航条
- 平滑切换动画
- 支持点击/空格逐步显示内容

---

## 交互课件生成规范

### 核心理念

交互课件是增强版 PPT，包含：
- **拖拽操作** — 可视化赋值、交换等概念
- **代码执行可视化** — 逐行高亮执行过程
- **随堂测验** — 即时反馈的选择题
- **编程练习** — 代码输入与验证
- **学习追踪** — 分数、连胜、进度

### 全屏交互布局

交互课件必须使用全屏 flexbox 布局：

```html
<div class="app-container">
    <!-- 顶部栏 -->
    <header class="header">
        <div><!-- 标题区 --></div>
        <div><!-- 分数/连胜显示 --></div>
    </header>
    <!-- 步骤内容 -->
    <div class="content">
        <div class="step-container">
            <!-- 当前步骤内容 -->
        </div>
    </div>
    <!-- 底部导航 -->
    <div class="nav-bar">
        <nav class="step-nav">
            <!-- 步骤1 步骤2 步骤3 ... -->
        </nav>
    </div>
</div>
```

```css
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.content { flex: 1; display: flex; flex-direction: column; }
.step-container { flex: 1; padding: 1.5rem; padding-bottom: 5rem; }
```

### 交互元素设计

#### 1. 拖拽赋值（变量赋值概念）

```html
<!-- 拖拽源：数值方块 -->
<div class="var-box" draggable="true" data-value="5">
    <span class="text-2xl">5</span>
    <span class="text-xs">数值</span>
</div>

<!-- 放置槽：变量 -->
<div class="slot" data-var="a">
    <span class="text-gray-400">a</span>
    <span class="text-xs text-gray-500">变量</span>
</div>
```

#### 2. 代码执行可视化

```html
<div class="code-block">
    <div class="code-line" data-line="1">
        <span class="code-keyword">int</span> a = <span class="code-number">5</span>;
    </div>
    <div class="code-line" data-line="2">
        a = a + <span class="code-number">1</span>;
    </div>
</div>
<script>
// 逐行高亮执行
codeLines.forEach((line, i) => {
    setTimeout(() => {
        line.classList.add('executed');
    }, i * 1000);
});
</script>
```

#### 3. 随堂测验

```html
<div class="quiz-option" data-correct="true">
    <span class="letter">A</span>
    <span>6</span>
</div>
<div class="quiz-option" data-correct="false">
    <span class="letter">B</span>
    <span>5</span>
</div>
```

#### 4. 即时反馈动画

```javascript
// 正确反馈
function showCorrect(element) {
    element.classList.add('correct');
    createParticles(element); // 彩色粒子效果
    updateScore(10);
    updateStreak();
}

// 错误反馈
function showWrong(element) {
    element.classList.add('wrong');
    resetStreak();
}
```

### 学习追踪系统

```javascript
const learningData = {
    score: 0,
    streak: 0,
    completedSteps: [],
    quizResults: []
};

function updateScore(points) {
    learningData.score += points;
    document.getElementById('scoreDisplay').textContent = learningData.score;
}

function updateStreak() {
    learningData.streak++;
    document.getElementById('streakDisplay').textContent = learningData.streak;
    if (learningData.streak >= 3) {
        showBadge('连胜达成');
    }
}
```

### 动画效果库

```css
/* 浮动动画 */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.animate-float { animation: float 3s ease-in-out infinite; }

/* 弹入动画 */
@keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.animate-pop { animation: popIn 0.3s ease; }

/* 上滑动画 */
@keyframes slideUp { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
.animate-slide { animation: slideUp 0.3s ease; }

/* 粒子效果 */
.particle { position: fixed; pointer-events: none; animation: confetti 0.8s ease forwards; }
@keyframes confetti { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(2) translateY(-50px); } }
```

### 典型交互流程

```
步骤1: 概念引入（卡片展示 + 生活类比）
    ↓ 点击/空格
步骤2: 拖拽赋值（拖动数值方块到变量槽）
    ↓ 正确完成
步骤3: 代码执行（逐行高亮 + 变量变化动画）
    ↓ 点击"下一步"
步骤4: 变量交换（三变量法演示）
    ↓ 点击
步骤5: 随堂测验（选择题，即时反馈）
    ↓
步骤6: 编程练习（输入代码，验证正确性）
    ↓
步骤7: 总结报告（学习数据回顾）
```

### 文件输出

输出路径: `courses/课程名/课时名/index.html`

### 技术栈

- TailwindCSS（CDN）
- 原生 HTML5 Drag and Drop API
- 原生 JavaScript
- CSS Animations
- 无需 Vue/React，保持轻量

---

## 通俗示例：print()

### 教案中的 print()

```
### print() 是什么？

**通俗解释**：
print() 是一个"命令"，意思是"显示出来"

**生活类比**：
就像打印机打印文件一样，print() 就是"打印到屏幕上"

**代码示例**：
```python
print("Hello")
```

**解释**：这行代码让计算机在屏幕上显示 "Hello"
```

### PPT 中的 print()

```
┌─────────────────────────────────────┐
│ print() 是什么？                      │
├─────────────────────────────────────┤
│ 📝 一个"命令"                        │
│    意思是"显示出来"                   │
│                                     │
│ ⚙️ 它做什么？                        │
│    控制屏幕显示文字                   │
│                                     │
│ 🖨️ 类比                             │
│    就像打印机打印到纸上               │
│    print = "打印到屏幕"              │
└─────────────────────────────────────┘
```

---

## 使用方式

### 命令触发

- `/生成教案 课时名` — 生成教案
- `/生成PPT 课时名` — 生成 PPT
- `/生成交互课件 课时名` — 生成交互式课件（含拖拽/测验/代码执行）
- `/生成图表 课时名` — 仅生成图表

### 对话触发

- "帮我写一节关于变量的教案"
- "帮我生成排序算法的 PPT"
- "帮我生成一个交互式课件讲变量赋值"

### 半自动流程

1. 用户提供授课思路
2. AI 生成预览
3. 用户确认/修改
4. AI 写入文件

### 交互课件适用场景

推荐对以下知识点生成交互课件：
- 变量赋值与交换
- if/else 条件判断
- for/while 循环
- 数组遍历与操作
- 函数调用与返回值

对于简单概念，可用标准 PPT；对于需要动手操作的知识点，用交互课件。

---

## 技术依赖

- **D2**: `d2` CLI 工具
- **Mermaid**: CDN 引入
- **Draw.io**: 生成 XML 格式
- **TailwindCSS**: CDN
- **Vue3**: CDN（可选）

---

## 文件命名

- 教案: `courses/课程名/课时名/教案.md`
- PPT/交互课件: `courses/课程名/课时名/index.html`
- 图表: 内联嵌入或单独文件
