export class Input {
    constructor() {
        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };

        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('click', () => {
            this.mouse.clicked = true;
        });
    }

    isKeyDown(key) {
        return !!this.keys[key.toLowerCase()];
    }
}
