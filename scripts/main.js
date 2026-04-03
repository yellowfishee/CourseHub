import COURSES_DATA from './courses-data.js';

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

const CATEGORY_ORDER = ['Scratch', 'Python', 'C++', '练习'];
const CATEGORY_NAMES = {
    'Scratch': { icon: '🧩', name: 'Scratch 图形化编程' },
    'Python': { icon: '🐍', name: 'Python 语法篇' },
    'C++': { icon: '⚡', name: 'C++ 语法篇' },
    '练习': { icon: '🎯', name: '练习小项目' }
};

function getCategory(courseTitle) {
    for (const cat of CATEGORY_ORDER) {
        if (courseTitle.includes(cat)) return cat;
    }
    return '其他';
}

function renderCourses(filter = '') {
    const container = document.getElementById('courses-container');
    if (!container) return;

    const search = filter.toLowerCase().trim();
    
    const filtered = search 
        ? COURSES_DATA.filter(c => 
            c.title.toLowerCase().includes(search) ||
            c.description?.toLowerCase().includes(search) ||
            c.lessons?.some(l => l.title.toLowerCase().includes(search))
        )
        : COURSES_DATA;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <p>没有找到"${escapeHTML(filter)}"相关的课程</p>
                <button class="clear-search" onclick="document.getElementById('search-input').value=''; renderCourses();">清除搜索</button>
            </div>
        `;
        document.getElementById('course-count').textContent = '';
        return;
    }

    const grouped = {};
    filtered.forEach(course => {
        const cat = getCategory(course.title);
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(course);
    });

    let html = '';
    
    // 保留顺序，缺失的分类不显示
    const categories = CATEGORY_ORDER.filter(cat => grouped[cat]);
    
    if (!search && categories.length > 1) {
        // 有分组时显示分类标题
        categories.forEach(cat => {
            const info = CATEGORY_NAMES[cat] || { icon: '📚', name: cat };
            const courses = grouped[cat];
            html += `
                <section class="course-category">
                    <h3 class="category-title">
                        <span class="category-icon">${info.icon}</span>
                        ${info.name}
                        <span class="category-count">${courses.length}</span>
                    </h3>
                    <div class="course-grid">
                        ${courses.map(course => renderCard(course)).join('')}
                    </div>
                </section>
            `;
        });
    } else {
        // 搜索结果或单个分类时扁平显示
        html += `<div class="course-grid">`;
        filtered.forEach(course => {
            html += renderCard(course);
        });
        html += `</div>`;
    }

    container.innerHTML = html;
    document.getElementById('course-count').textContent = `共 ${filtered.length} 个课程`;
}

function renderCard(course) {
    return `
        <a href="course.html?slug=${encodeURIComponent(course.slug)}" class="course-card">
            <div class="card-header">
                <span class="card-icon">${getCourseIcon(course)}</span>
                <h2>${escapeHTML(course.title)}</h2>
            </div>
            <p class="card-desc">${escapeHTML(course.description) || '点击查看课程详情'}</p>
            <div class="card-footer">
                <span class="card-lessons">${course.lessons?.length || 0} 课时</span>
                <span class="card-arrow">→</span>
            </div>
        </a>
    `;
}

function getCourseIcon(course) {
    const title = course.title;
    if (title.includes('Scratch')) return '🧩';
    if (title.includes('Python')) return '🐍';
    if (title.includes('C++') || title.includes('cpp')) return '⚡';
    return '📖';
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let timer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            renderCourses(e.target.value);
        }, 200);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            renderCourses();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderCourses();
        initSearch();
    });
} else {
    renderCourses();
    initSearch();
}

window.renderCourses = renderCourses;
window.CourseHub = { COURSES_DATA };
