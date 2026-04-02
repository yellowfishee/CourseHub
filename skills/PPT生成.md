# PPT 生成规范

## 核心原则

### 1. 交互优先（最重要！）

**学生必须参与，不能只是看！**

每个知识点都要设计交互环节：
- 拖拽题：把答案拖到正确位置
- 选择题：点击选择即时反馈
- 填空题：输入代码并验证
- 排序题：拖拽排列正确顺序

**交互设计检查清单：**
- [ ] 这个知识点有交互吗？
- [ ] 学生能动手操作吗？
- [ ] 操作后有即时反馈吗？
- [ ] 有得分/连胜等激励机制吗？

### 2. 语言通俗易懂

**面向零基础初学者，每页都要问：**

- 零基础的人能看懂这页吗？
- 有没有用生活例子解释？
- 有没有专业词汇没解释？

**常用词汇对照：**

| PPT上应该用的词 | 避免用的词 |
|-----------------|-----------|
| 命令 | 函数（除非解释清楚） |
| 显示出来 / 打印 | 输出、打印 |
| 让计算机记住 | 赋值、存储 |
| 拆解问题 | 拆分问题 |
| 实际上在做什么 | 本质是什么 |
| 就像...一样 | （多用类比） |

**每页都要有的元素：**

```
大问题/标题
     ↓
生活例子/类比（用表情或图片）
     ↓
代码示例
     ↓
交互练习（拖拽/选择/输入）
     ↓
一句话总结
```

### 3. 问题拆解流程

**贯穿整个 PPT 的流程：**

```
遇到问题
  → 拆解问题
    → 再拆解
      → 直到能用一个命令解决
```

**PPT 结构设计：**

```
课程开始：
  [用一个生活问题引入]

每个知识点：
  [先展示拆解过程（怎么把问题变小）]
  [再展示代码（怎么用命令解决）]
  [最后交互练习（学生动手做）]

课程结束：
  [用通俗的话总结今天学了什么]
```

---

## 视觉规范

| 项目 | 规范 |
|------|------|
| 比例 | 16:9 横屏 |
| 背景 | #0a0a0a 或渐变背景 |
| **文字颜色 | 必须使用亮色：#ffffff、#f0f0f0、#e0e0e0** |
| 辅助文字 | #b0b0b0、#a0a0a0 |
| 强调色 | #60a5fa（亮蓝）、#34d399（亮绿）、#fbbf24（亮黄）、#f472b6（亮粉） |
| 中文字体 | HarmonyOS Sans SC / 思源黑体 |
| 英文字体 | Inter / Roboto |
| 标题字重 | font-bold |
| 正文字重 | font-light / font-normal |

---

## 拖拽交互系统（核心！）

### 拖拽题型设计

#### 1. 拖拽填空题

```html
<!-- 题目区域 -->
<div class="question-box">
    <p>把正确的数字拖到框里：a = <span class="drop-zone" data-answer="5">?</span></p>
</div>

<!-- 可选项 -->
<div class="drag-options">
    <div class="drag-item" draggable="true" data-value="3">3</div>
    <div class="drag-item" draggable="true" data-value="5">5</div>
    <div class="drag-item" draggable="true" data-value="7">7</div>
</div>
```

```javascript
// 拖拽逻辑
dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('highlight');
});

dropZone.addEventListener('drop', e => {
    const value = e.dataTransfer.getData('text/plain');
    if (value === dropZone.dataset.answer) {
        dropZone.textContent = value;
        dropZone.classList.add('correct');
        updateScore(10);
        showFeedback('正确！', 'green');
    } else {
        dropZone.classList.add('wrong');
        updateStreak(0);
        showFeedback('再想想', 'red');
    }
});
```

#### 2. 拖拽排序题

```html
<!-- 题目 -->
<p class="text-xl mb-6">把执行顺序排列正确：</p>

<!-- 排序区域 -->
<div class="sort-zone">
    <div class="sort-item" data-correct="1">做菜</div>
    <div class="sort-item" data-correct="2">端菜</div>
    <div class="sort-item" data-correct="3">点菜</div>
</div>

<!-- 可拖拽项 -->
<div class="drag-source">
    <div class="drag-item" draggable="true">做菜</div>
    <div class="drag-item" draggable="true">端菜</div>
    <div class="drag-item" draggable="true">点菜</div>
</div>
```

#### 3. 拖拽分类题

```html
<!-- 分类区域 -->
<div class="category-zone">
    <div class="category" data-type="变量">
        <div class="category-label">变量</div>
        <div class="drop-zone"></div>
    </div>
    <div class="category" data-type="命令">
        <div class="category-label">命令</div>
        <div class="drop-zone"></div>
    </div>
</div>

<!-- 待分类项 -->
<div class="drag-items">
    <div class="drag-item" draggable="true" data-type="变量">a = 5</div>
    <div class="drag-item" draggable="true" data-type="命令">print()</div>
</div>
```

---

## 测验系统

### 即时反馈测验

```html
<div class="quiz-container">
    <p class="quiz-question">print("Hello") 会显示什么？</p>
    <div class="quiz-options">
        <div class="quiz-option" data-correct="true">
            <span class="letter">A</span>
            <span>Hello</span>
        </div>
        <div class="quiz-option" data-correct="false">
            <span class="letter">B</span>
            <span>print("Hello")</span>
        </div>
        <div class="quiz-option" data-correct="false">
            <span class="letter">C</span>
            <span>报错</span>
        </div>
    </div>
</div>
```

```javascript
quizOption.addEventListener('click', () => {
    if (option.dataset.correct === 'true') {
        option.classList.add('correct');
        showParticles(option);
        updateScore(10);
        updateStreak();
    } else {
        option.classList.add('wrong');
        resetStreak();
    }
});
```

---

## 学习追踪系统

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
    animateScore();
}

function updateStreak() {
    learningData.streak++;
    document.getElementById('streakDisplay').textContent = learningData.streak;
    if (learningData.streak >= 3) {
        showBadge('连胜 ' + learningData.streak);
    }
}

function resetStreak() {
    learningData.streak = 0;
    document.getElementById('streakDisplay').textContent = '0';
}
```

---

## 即时反馈动画

```css
/* 正确反馈 */
@keyframes correctPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); background: rgba(52, 211, 153, 0.3); }
    100% { transform: scale(1); }
}
.correct { 
    animation: correctPulse 0.5s ease;
    border-color: #34d399 !important;
    color: #34d399;
}

/* 错误反馈 */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
.wrong { 
    animation: shake 0.3s ease;
    border-color: #f87171 !important;
}

/* 粒子效果 */
.particle {
    position: fixed;
    pointer-events: none;
    animation: confetti 0.8s ease forwards;
}
@keyframes confetti {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(2) translateY(-50px); }
}
```

---

## 全屏布局规范

```css
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.header {
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.content { flex: 1; display: flex; flex-direction: column; }
.step-container { flex: 1; padding: 1.5rem; padding-bottom: 5rem; }
.nav-bar {
    padding: 0.75rem 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
}
```

---

## 技术栈

- TailwindCSS（CDN）
- 原生 HTML5 Drag and Drop API
- 原生 JavaScript（ES modules）
- CSS Animations
- **无需 Vue/React，保持轻量**

---

## 页数规范

**不设上限，讲完为止。**

根据内容需要决定页数，可以是 5 页，也可以是 50 页，只要能把知识点讲清楚。

---

## 文件输出

输出路径: `courses/课程名/课时名/index.html`

**注意：每个课件都应该是可交互的，学生必须动手参与！**
