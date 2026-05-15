export class Game {
    constructor() {
        this.m_activeScene = null;
        this.m_lastTime = 0;

        this._loop = this._loop.bind(this);
    }

    switchScene(newScene) {
        this.m_activeScene = newScene;
        this.m_activeScene.init();
    }

    start(initialScene) {
        this.switchScene(initialScene);
        requestAnimationFrame(this._loop);
    }

    _loop(timestamp) {
        const deltaTime = (timestamp - this.m_lastTime) / 1000;
        this.m_lastTime = timestamp;

        if (this.m_activeScene) {
            this.m_activeScene.update(deltaTime);
        }

        requestAnimationFrame(this._loop);
    }
}
