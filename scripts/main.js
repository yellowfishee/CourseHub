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
    const container = document.getElementById('courses-container');
    if (!container) return;

    if (COURSES_DATA.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#64748b;padding:2rem;">暂无课程</p>';
        return;
    }

    container.innerHTML = COURSES_DATA.map(course => `
        <a href="course.html?slug=${encodeURIComponent(course.slug)}" class="course-card">
            <div class="card-header">
                <span class="card-icon">${course.icon || '📖'}</span>
                <div>
                    <h2>${escapeHTML(course.title)}</h2>
                </div>
            </div>
            <p class="card-description">${escapeHTML(course.description) || '暂无描述'}</p>
            <span class="card-arrow">→</span>
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
