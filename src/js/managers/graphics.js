export class Graphics {
    constructor() {
        this.m_canvas = document.createElement('canvas');
        this.m_ctx = this.m_canvas.getContext('2d');
        this.m_canvas.width = 1280;
        this.m_canvas.height = 720;
        document.body.appendChild(this.m_canvas);
    }

    clear() {
        this.m_ctx.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
    }

    drawRect(x, y, width, height, color) {
        this.m_ctx.fillStyle = color;
        this.m_ctx.beginPath();
        this.m_ctx.rect(x, y, width, height);
        this.m_ctx.fill();
    }

    drawCircle(x, y, radius, color) {
        this.m_ctx.fillStyle = color;
        this.m_ctx.beginPath();
        this.m_ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.m_ctx.fill();
    }

    drawImage(x, y, width, height, img) {
        if (!img || !img.complete || img.naturalWidth === 0) return;
        this.m_ctx.drawImage(img, x, y, width, height);
    }

    drawText(x, y, data, size, color) {
        this.m_ctx.fillStyle = color;
        this.m_ctx.font = size + 'px serif';
        this.m_ctx.textAlign = 'center';
        this.m_ctx.textBaseline = 'middle';
        this.m_ctx.fillText(data, x, y)
    }
}
