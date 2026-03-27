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

if (course) {
    document.title = `${escapeHTML(course.title)} - CourseHub`;
    document.getElementById('course-content').innerHTML = `
        <h1>${escapeHTML(course.title)}</h1>
        <p class="description">${escapeHTML(course.description)}</p>
    `;
    document.getElementById('lesson-list').innerHTML = course.lessons.map(lesson => `
        <div class="lesson-card">
            <a href="lesson.html?course=${encodeURIComponent(course.slug)}&lesson=${encodeURIComponent(lesson.slug)}">
                <span>${escapeHTML(lesson.title)}</span>
            </a>
        </div>
    `).join('');
} else {
    document.getElementById('course-content').innerHTML = '<p>课程未找到</p>';
}
