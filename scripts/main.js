import COURSES_DATA from './courses-data.js';
import { renderMarkdown } from './markdown-renderer.js';

function renderCourseList() {
    const container = document.getElementById('course-list');
    if (!container) return;

    if (COURSES_DATA.length === 0) {
        container.innerHTML = '<p>暂无课程</p>';
        return;
    }

    container.innerHTML = COURSES_DATA.map(course => `
        <a href="course.html?slug=${course.slug}" class="course-card">
            <h2>${course.title}</h2>
            <p>${course.description || '暂无描述'}</p>
            <span>${course.lessons.length} 课时</span>
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
