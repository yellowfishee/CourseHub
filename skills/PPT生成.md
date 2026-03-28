# PPT 生成规范

## 核心原则

### 1. 语言通俗易懂（最重要！）

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
一句话总结
```

### 2. 问题拆解流程

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
  [最后一句话总结（记住什么）]

课程结束：
  [用通俗的话总结今天学了什么]
```

---

## 视觉规范

| 项目 | 规范 |
|------|------|
| 比例 | 16:9 横屏 |
| 背景 | #0a0a0a 或 #111111 + 模糊光斑动画 |
| **文字颜色 | 必须使用亮色：#ffffff、#f0f0f0、#e0e0e0，禁止使用深色（黑色、深灰）** |
| 辅助文字 | #b0b0b0、#a0a0a0 |
| 强调色 | #60a5fa（亮蓝）、#34d399（亮绿）、#fbbf24（亮黄）、#f472b6（亮粉） |
| 中文字体 | HarmonyOS Sans SC / 思源黑体 |
| 英文字体 | Inter / Roboto |
| 标题字重 | font-bold |
| 正文字重 | font-light / font-normal |

### 逐步显示动画（重要！用户触发式）

**同一页内，点击逐步显示元素，全部显示完后才翻页：**

1. **核心逻辑**：
   - 每页所有元素默认隐藏（opacity: 0, transform: translateY(20px)）
   - 每次点击空格/右箭头，显示下一个元素
   - 当前页元素全部显示完后，再点击才翻到下一页
   - 左箭头：已显示元素重新隐藏（回到上一个状态）

2. **CSS 动画**：
   ```css
   .animate-item {
       opacity: 0;
       transform: translateY(20px);
       transition: opacity 0.3s ease, transform 0.3s ease;
   }
   .animate-item.visible {
       opacity: 1;
       transform: translateY(0);
   }
   ```

3. **JavaScript 逻辑**：
   ```javascript
   let currentSlide = 0;
   let currentItem = 0;  // 当前页已显示的元素索引

   document.addEventListener('keydown', (e) => {
       if (e.key === 'ArrowRight' || e.key === ' ') {
           // 获取当前页所有元素
           const items = slides[currentSlide].querySelectorAll('.animate-item');
           if (currentItem < items.length) {
               // 还有元素没显示，显示下一个
               items[currentItem].classList.add('visible');
               currentItem++;
           } else {
               // 元素已全部显示，翻到下一页
               nextSlide();
           }
       }
   });

   function nextSlide() {
       // 翻页逻辑，重置 currentItem = 0
   }
   ```

4. **每个元素都要添加 `animate-item` class**

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
- 专业词汇不解释
- 横屏比例偏离
- 偏离极简科技风

## 默认规则

- 未指定页数：自动生成 8~20 页
- 未指定风格：默认乔布斯风

## PPT 结构模板

```html
<!-- 第1页：封面 -->
<div class="slide">
    <h1>标题</h1>
    <p class="subtitle">副标题（通俗易懂）</p>
</div>

<!-- 第2页：今天的问题 -->
<div class="slide">
    <h2>先想一个问题</h2>
    <p class="text-2xl">如何让计算机做 xxx？</p>
    <p class="hint">先别写代码，先想清楚怎么做</p>
</div>

<!-- 第3页：拆解问题 -->
<div class="slide">
    <h2>拆解这个问题</h2>
    <!-- 用步骤展示拆解过程 -->
    <!-- 1 → 1.1 → 1.2 → ... -->
</div>

<!-- 第4-N页：知识点讲解 -->
<!-- 每页包含： -->
<!-- 1. 生活类比（用表情图标） -->
<!-- 2. 代码展示 -->
<!-- 3. 一句话总结 -->

<!-- 最后一页：总结 -->
<!-- 用通俗的话总结今天学了什么 -->
```

## 生活类比示例页

```html
<!-- 用餐厅服务员类比计算机工作 -->
<div class="slide">
    <h2>就像去餐厅吃饭</h2>
    <div class="analogy-box">
        <div class="emoji">🍽️</div>
        <p>你点菜（接收）→ 厨房做（处理）→ 端菜给你（展示）</p>
    </div>
    <p class="text-gray-400 mt-4">计算机也一样：接收命令 → 处理 → 展示结果</p>
</div>
```

## print() 示例页（通俗版）

```html
<!-- print() 是什么 -->
<div class="slide">
    <h2>print() 是什么？</h2>
    <div class="grid-3">
        <div class="card">
            <div class="emoji">📝</div>
            <div class="title">print() 是什么？</div>
            <div class="desc">一个"命令"</div>
            <div class="sub">意思是"显示出来"</div>
        </div>
        <div class="card">
            <div class="emoji">⚙️</div>
            <div class="title">它做什么？</div>
            <div class="desc">控制屏幕显示</div>
            <div class="sub">把文字显示在屏幕上</div>
        </div>
        <div class="card">
            <div class="emoji">🖨️</div>
            <div class="title">类比</div>
            <div class="desc">就像打印机</div>
            <div class="sub">print = "打印到屏幕"</div>
        </div>
    </div>
</div>
```

## HTML PPT 模板

```html
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
            background: #60a5fa;
        }

        /* 逐步显示动画 - 用户触发 */
        .animate-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .animate-item.visible {
            opacity: 1;
            transform: translateY(0);
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
```

## 文件输出

输出路径: `courses/课程名/课时名/index.html`
