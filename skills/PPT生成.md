# PPT 生成规范

## 核心原则

### 1. 模块化思维（工程化意识）

**每页 PPT 必须包含的三个层次：**

| 层次 | 问题 | 示例 |
|------|------|------|
| 表层 | "是什么"？ | print() 是一个函数 |
| 底层 | "本质是什么"？ | print() 控制终端打印内容 |
| 系统层 | "属于哪个模块"？ | 属于输出模块，是人机交互的一部分 |

**本质展示技巧：**

- 用"输入 → 模块 → 输出"的结构图说明
- 用箭头标注"控制了什么"
- 对比"不用这个模块时会发生什么"

### 2. 编程思维流程（问题拆分）

**贯穿整个 PPT 的流程：**

```
遇到问题
  → 拆分问题
    → 拆分问题
      → 直到能用代码解决
```

**PPT 结构设计：**

```
课程开始：
  [展示本课要解决的核心问题]

每个知识点：
  [先展示拆分过程]
  [再展示代码实现]
  [最后展示本质/模块]

课程结束：
  [总结：今天学的模块在系统中的位置]
```

---

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

## PPT 结构模板

```html
<!-- 第1页：封面 -->
<div class="slide">
    <h1>课时名称</h1>
    <p class="text-gray-400">所属课程：xxx</p>
</div>

<!-- 第2页：本课要解决的核心问题 -->
<div class="slide">
    <h2>今天的问题</h2>
    <p class="text-2xl">[用具体例子引出核心问题]</p>
</div>

<!-- 第3页：编程思维 - 拆分问题 -->
<div class="slide">
    <h2>编程思维：拆分问题</h2>
    <!-- 用图示展示拆分过程 -->
</div>

<!-- 第4-N页：知识点讲解 -->
<!-- 每个知识点包含： -->
<!-- 1. 是什么 + 本质 -->
<!-- 2. 模块视角 -->
<!-- 3. 代码实现 -->
<!-- 4. 交互演示 -->

<!-- 最后一页：总结 -->
<!-- 1. 今天学了什么模块 -->
<!-- 2. 在系统中的位置 -->
```

## 模块化视角示例

```html
<!-- print() 的模块化视角 -->
<div class="slide">
    <h2>print() 的本质</h2>
    <div class="flex items-center justify-center gap-8 text-2xl">
        <span class="text-blue-400">"Hello"</span>
        <span>→</span>
        <div class="bg-gray-800 px-6 py-4 rounded">
            <div class="text-yellow-400">print()</div>
            <div class="text-sm text-gray-400">输出模块</div>
        </div>
        <span>→</span>
        <span class="text-green-400">终端显示</span>
    </div>
    <p class="text-gray-400 mt-8">本质：控制终端打印内容</p>
</div>
```

## 编程思维页示例

```html
<!-- 拆分问题的可视化 -->
<div class="slide">
    <h2>如何输出 100 次 "Hello"？</h2>
    <div class="text-left text-xl space-y-4">
        <div class="flex items-center gap-4">
            <span class="bg-blue-600 px-3 py-1 rounded">1</span>
            <span>大问题：输出 100 次</span>
        </div>
        <div class="ml-8 border-l-2 border-gray-600 pl-4">
            <div class="flex items-center gap-4">
                <span class="bg-blue-600 px-3 py-1 rounded">1.1</span>
                <span>拆解：重复 100 次 = 循环</span>
            </div>
            <div class="flex items-center gap-4 mt-2">
                <span class="bg-blue-600 px-3 py-1 rounded">1.2</span>
                <span>拆解：每次输出 = print()</span>
            </div>
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
```

## 文件输出

输出路径: `courses/课程名/课时名/index.html`
