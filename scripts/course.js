import COURSES_DATA from './courses-data.js';

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, function(match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

const params = new URLSearchParams(window.location.search);
const courseSlug = params.get('slug');
const course = COURSES_DATA.find(c => c.slug === courseSlug);

function renderLessons(filter = '') {
    const container = document.getElementById('lesson-list');
    if (!container || !course) return;

    const search = filter.toLowerCase().trim();
    const lessons = search 
        ? course.lessons.filter(l => l.title.toLowerCase().includes(search))
        : course.lessons;

    if (lessons.length === 0) {
        container.innerHTML = `
            <div class="empty-lessons">
                ${search ? `没有找到"${escapeHTML(filter)}"相关的课时` : '暂无课时'}
            </div>
        `;
        return;
    }

    container.innerHTML = lessons.map(lesson => `
        <a href="lesson.html?course=${encodeURIComponent(course.slug)}&lesson=${encodeURIComponent(lesson.slug)}" class="lesson-card">
            <div class="lesson-info">
                <h3>${escapeHTML(lesson.title)}</h3>
            </div>
            <span class="lesson-arrow">→</span>
        </a>
    `).join('');
}

if (course) {
    document.title = `${escapeHTML(course.title)} - CourseHub`;
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description || '';
    renderLessons();

    const searchInput = document.getElementById('lesson-search-input');
    let timer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => renderLessons(e.target.value), 200);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            renderLessons();
        }
    });
} else {
    document.getElementById('course-title').textContent = '课程未找到';
    document.getElementById('course-description').textContent = '';
    document.getElementById('lesson-list').innerHTML = `
        <div class="empty-lessons">课程不存在或已被移除</div>
    `;
}
