import COURSES_DATA from './courses-data.js';
import { renderMarkdown } from './markdown-renderer.js';

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

function renderCourseList() {
    const container = document.getElementById('course-list');
    if (!container) return;

    if (COURSES_DATA.length === 0) {
        container.innerHTML = '<p>暂无课程</p>';
        return;
    }

    container.innerHTML = COURSES_DATA.map(course => `
        <a href="course.html?slug=${escapeHTML(course.slug)}" class="course-card">
            <h2>${escapeHTML(course.title)}</h2>
            <p>${escapeHTML(course.description) || '暂无描述'}</p>
            <div class="meta">
                <span>📚 ${course.lessons.length} 课时</span>
            </div>
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
