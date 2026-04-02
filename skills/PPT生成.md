# PPT 生成规范

## 核心理念

**目标：面向零基础中小学生的编程入门课程**

1. **动手优先**：学生必须参与，不能只是看
2. **类比教学**：每个概念都要有生活类比
3. **问题拆解**：大问题拆成小问题
4. **即时反馈**：操作后立即看到结果

---

## 一、页面数量规范

**不设上限，讲完为止！**

根据内容复杂度决定页数：
- 简单概念（变量）：10-15页
- 中等概念（循环、函数）：20-30页
- 复杂概念（递归、指针）：30-50页
- 复习章节：25-35页

**判断标准：**
- [ ] 概念引入有生活类比吗？
- [ ] 每个小知识点有代码示例吗？
- [ ] 有互动练习让学生操作吗？
- [ ] 有总结帮助回顾吗？

---

## 二、页面结构模板

每个知识点至少包含以下5个部分：

```
┌─────────────────────────────────────┐
│  标题/问题                           │
│  （用生活场景引入）                   │
├─────────────────────────────────────┤
│  生活类比                            │
│  （用表情/图片解释）                  │
├─────────────────────────────────────┤
│  代码示例                            │
│  （最简单例子，逐行解释）             │
├─────────────────────────────────────┤
│  交互练习                            │
│  （拖拽/选择/填空）                   │
├─────────────────────────────────────┤
│  一句话总结                          │
└─────────────────────────────────────┘
```

---

## 三、交互组件类型

### 1. 拖拽题（必须包含）

**拖拽填空：**
```html
<p>把正确的数字拖到框里：a = <span class="drop-zone" data-answer="5">?</span></p>
<div class="drag-items">
    <div class="drag-item" draggable="true" data-value="3">3</div>
    <div class="drag-item" draggable="true" data-value="5">5</div>
    <div class="drag-item" draggable="true" data-value="7">7</div>
</div>
```

**拖拽排序：**
```html
<p>把执行顺序排列正确：</p>
<div class="drop-zone" id="sortZone"></div>
<div class="drag-items">
    <div class="drag-item" draggable="true" data-step="1">第一步</div>
    <div class="drag-item" draggable="true" data-step="2">第二步</div>
    <div class="drag-item" draggable="true" data-step="3">第三步</div>
</div>
```

**拖拽分类：**
```html
<div class="category-zones">
    <div class="category" data-type="正确">
        <div class="category-label">✓ 正确</div>
        <div class="drop-zone"></div>
    </div>
    <div class="category" data-type="错误">
        <div class="category-label">✗ 错误</div>
        <div class="drop-zone"></div>
    </div>
</div>
<div class="drag-items">
    <div class="drag-item" draggable="true" data-type="正确">a = 5</div>
    <div class="drag-item" draggable="true" data-type="错误">int a[10]; a[10] = 1;</div>
</div>
```

### 2. 选择题（即时反馈）

```html
<div class="quiz-option" data-correct="true">
    <span class="letter">A</span>
    <span>正确选项</span>
</div>
<div class="quiz-option" data-correct="false">
    <span class="letter">B</span>
    <span>错误选项</span>
</div>
```

### 3. 代码填空

```html
<div class="code-fill-blank">
    <code>
        <span class="code-keyword">int</span> a[<span class="fill-area" data-answer="10">___</span>];
    </code>
</div>
<input type="text" class="blank-input" placeholder="填入数字..." data-target="10">
```

### 4. 代码执行模拟

```html
<div class="code-demo" id="demo1">
    <pre id="code-display">a = 5
b = 3
print(a + b)</pre>
    <button onclick="runCode()">▶ 运行</button>
    <div id="output" class="output-area"></div>
</div>
```

---

## 四、视觉设计规范

| 项目 | 规范 |
|------|------|
| 比例 | 16:9 横屏 |
| 背景 | #0a0a0a 纯黑或渐变 |
| 主文字 | #e2e8f0（浅灰白，确保可读性） |
| 强调色 | #60a5fa（亮蓝）、#34d399（亮绿）、#fbbf24（亮黄）、#f472b6（亮粉） |
| 错误色 | #f87171（亮红） |
| 辅助文字 | #94a3b8（灰色） |
| 代码背景 | #1e1e2e（深紫灰） |
| 圆角 | 8px-16px |
| 阴影 | rgba(0,0,0,0.3) |

**字体：**
- 中文：HarmonyOS Sans SC / 思源黑体
- 英文：Inter / JetBrains Mono（代码）
- 代码字重：font-normal
- 标题字重：font-bold

---

## 五、评分与激励机制

```javascript
let learningState = {
    score: 0,           // 总得分
    streak: 0,          // 连胜次数
    maxStreak: 0,       // 最大连胜
    correctCount: 0,     // 正确次数
    totalAttempts: 0    // 总尝试次数
};

function updateScore(points) {
    learningState.score += points;
    learningState.correctCount++;
    learningState.totalAttempts++;
    animateScoreChange(points);
}

function updateStreak() {
    learningState.streak++;
    if (learningState.streak >= 3) {
        showBadge(`🔥 连胜 ${learningState.streak}！`);
    }
}

function resetStreak() {
    learningState.maxStreak = Math.max(learningState.maxStreak, learningState.streak);
    learningState.streak = 0;
}
```

---

## 六、动画效果

```css
/* 正确反馈 - 脉冲 + 粒子 */
@keyframes correctPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); background: rgba(52, 211, 153, 0.3); }
    100% { transform: scale(1); }
}
.correct {
    animation: correctPulse 0.5s ease;
    border-color: #34d399 !important;
}

/* 错误反馈 - 抖动 */
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
@keyframes confetti {
    0% { opacity: 1; transform: scale(1) translateY(0); }
    100% { opacity: 0; transform: scale(2) translateY(-50px); }
}

/* 渐入效果 */
.animate-in {
    animation: fadeSlideIn 0.4s ease forwards;
}
@keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

---

## 七、拖拽系统实现

```javascript
// 1. 设置拖拽源
dragItems.forEach(item => {
    item.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.dataset.value);
        this.classList.add('dragging');
    });
    item.addEventListener('dragend', function() {
        this.classList.remove('dragging');
    });
});

// 2. 设置放置区
dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', function() {
    this.classList.remove('drag-over');
});

dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    const value = e.dataTransfer.getData('text/plain');
    const answer = this.dataset.answer;
    
    if (value === answer) {
        this.textContent = value;
        this.classList.add('correct');
        showParticles(this);
        updateScore(10);
        updateStreak();
        showFeedback('正确！', 'green');
    } else {
        this.classList.add('wrong');
        resetStreak();
        showFeedback('再想想...', 'red');
        setTimeout(() => this.classList.remove('wrong'), 500);
    }
});

// 3. 显示粒子效果
function showParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#34d399', '#60a5fa', '#fbbf24', '#f472b6'];
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            width: 8px;
            height: 8px;
            background: ${colors[i % 4]};
            border-radius: 50%;
            pointer-events: none;
            animation: confetti 0.8s ease forwards;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}
```

---

## 八、进度追踪系统

```html
<div class="progress-header">
    <div class="score-display">得分: <span id="scoreValue">0</span></div>
    <div class="streak-display">连胜: <span id="streakValue">0</span></div>
</div>

<div class="progress-bar">
    <div class="progress-fill" id="progressBar"></div>
</div>

<div class="progress-dots" id="progressDots"></div>
```

```javascript
function updateProgress() {
    const progress = (currentSlide / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i + 1 === currentSlide);
    });
}

function createDots() {
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => showSlide(i));
        progressDots.appendChild(dot);
    }
}
```

---

## 九、页面导航

```javascript
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    } else {
        showCompletionScreen();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return; // 输入框中不响应
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showSlide(currentSlide - 1);
    }
});
```

---

## 十、测验系统

```javascript
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function(e) {
        if (e.target.closest('button')) return;
        
        const isCorrect = this.dataset.correct === 'true';
        
        if (isCorrect) {
            this.classList.add('correct');
            showParticles(this);
            updateScore(10);
            updateStreak();
        } else {
            this.classList.add('wrong');
            resetStreak();
            setTimeout(() => this.classList.remove('wrong'), 300);
        }
    });
});
```

---

## 十一、PPT内容结构示例

### 简单概念（变量）- 15页

| 页码 | 内容 | 交互 |
|------|------|------|
| 1 | 标题页 | 无 |
| 2 | 生活引入：储物柜 | 无 |
| 3 | 什么是变量 | 无 |
| 4 | 变量的声明 | 拖拽填空 |
| 5 | 变量的赋值 | 选择题 |
| 6 | 代码示例 | 无 |
| 7 | 变量命名规则 | 拖拽分类 |
| 8 | 练习1 | 代码填空 |
| 9 | 常见错误 | 选择题 |
| 10 | 练习2 | 拖拽排序 |
| 11 | 多个变量 | 选择题 |
| 12 | 变量类型 | 拖拽分类 |
| 13 | 综合练习 | 拖拽填空 |
| 14 | 总结 | 无 |
| 15 | 下节预告 | 无 |

### 复杂概念（递归）- 40页

| 阶段 | 页数 | 内容 |
|------|------|------|
| 引入 | 5页 | 生活类比、问题展示 |
| 基础 | 10页 | 递归定义、终止条件、递归公式 |
| 示例 | 10页 | 阶乘、斐波那契、数字求和、汉诺塔 |
| 练习 | 8页 | 各种拖拽练习、选择题 |
| 深入 | 5页 | 调用栈、递归vs循环 |
| 总结 | 2页 | 总结、下节预告 |

---

## 十二、词汇对照表

| PPT上应该用的词 | 避免用的词 |
|-----------------|-----------|
| 命令 | 函数（除非解释清楚） |
| 显示出来 / 打印 | 输出 |
| 让计算机记住 | 赋值、存储 |
| 拆解问题 | 拆分问题 |
| 实际上在做什么 | 本质是什么 |
| 就像...一样 | （多用类比） |
| 大盒子/小盒子 | 数组 |
| 卡片/便利贴 | 变量 |
| 做一件什么事 | 执行什么操作 |

---

## 十三、类比库

| 概念 | 生活类比 |
|------|---------|
| 程序/代码 | 食谱、说明书 |
| 计算机处理 | 餐厅做菜（接单→做菜→上菜） |
| 命令/print | 遥控器按钮 |
| 变量 | 储物柜、便利贴 |
| 循环 | 重复做广播体操 |
| 判断/分支 | 遇到岔路口选择 |
| 函数 | 微波炉（放进去→设置→出来） |
| 递归 | 俄罗斯套娃 |
| 数组 | 一排编好号的储物柜 |
| 指针 | 取件码/钥匙 |

---

## 十四、文件输出

输出路径: `courses/课程名/课时名/index.html`

**重要：每个课件必须是完整可交互的HTML文件！**

---

## 十五、检查清单

开始生成PPT前检查：

- [ ] 知识点完整吗？（引入→概念→示例→练习→总结）
- [ ] 每个知识点都有生活类比吗？
- [ ] 有足够的交互让学生动手吗？
- [ ] 交互类型多样吗？（拖拽、选择、填空）
- [ ] 即时反馈明确吗？
- [ ] 有评分和激励机制吗？
- [ ] 页数足够讲清楚吗？
- [ ] 文字颜色在暗色背景上清晰可见吗？
- [ ] 代码有语法高亮吗？
- [ ] 导航流畅吗？

---

**最后：好的PPT让学生想动手，差的PPT让学生想睡觉。**
