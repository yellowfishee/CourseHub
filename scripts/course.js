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
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description || '';

    if (course.lessons && course.lessons.length > 0) {
        document.getElementById('lesson-list').innerHTML = course.lessons.map(lesson => `
            <a href="lesson.html?course=${encodeURIComponent(course.slug)}&lesson=${encodeURIComponent(lesson.slug)}" class="lesson-card">
                <div class="lesson-info">
                    <h3>${escapeHTML(lesson.title)}</h3>
                </div>
                <span class="lesson-arrow">→</span>
            </a>
        `).join('');
    } else {
        document.getElementById('lesson-list').innerHTML = `
            <div class="empty-state">
                <div class="icon">📭</div>
                <p>暂无课时</p>
            </div>
        `;
    }
} else {
    document.getElementById('course-title').textContent = '课程未找到';
    document.getElementById('course-description').textContent = '';
    document.getElementById('lesson-list').innerHTML = `
        <div class="empty-state">
            <div class="icon">❌</div>
            <p>课程不存在或已被移除</p>
        </div>
    `;
}
