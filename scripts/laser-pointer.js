export class LaserPointer {
    constructor(container) {
        this.container = container;
        this.element = null;
        this.isActive = false;
        this.fadeTimeout = null;
        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.id = 'laser-pointer';
        this.element.style.cssText = `
            position: fixed;
            width: 24px;
            height: 24px;
            background: radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0.4) 40%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.1s;
            display: none;
        `;
        document.body.appendChild(this.element);

        this.container.addEventListener('mousedown', this.show.bind(this));
        this.container.addEventListener('mouseup', this.hide.bind(this));
        this.container.addEventListener('mouseleave', this.hide.bind(this));
        this.container.addEventListener('mousemove', this.move.bind(this));
    }

    show(e) {
        this.isActive = true;
        this.element.style.display = 'block';
        this.move(e);
        this.element.style.opacity = '1';
        if (this.fadeTimeout) {
            clearTimeout(this.fadeTimeout);
            this.fadeTimeout = null;
        }
    }

    hide() {
        if (!this.isActive) return;
        this.isActive = false;
        this.element.style.opacity = '0';
        this.fadeTimeout = setTimeout(() => {
            this.element.style.display = 'none';
        }, 800);
    }

    move(e) {
        if (!this.isActive) return;
        this.element.style.left = `${e.clientX - 12}px`;
        this.element.style.top = `${e.clientY - 12}px`;
    }

    destroy() {
        this.container.removeEventListener('mousedown', this.show);
        this.container.removeEventListener('mouseup', this.hide);
        this.container.removeEventListener('mouseleave', this.hide);
        this.container.removeEventListener('mousemove', this.move);
        this.element.remove();
    }
}
