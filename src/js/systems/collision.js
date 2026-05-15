import { MenuScene } from '../scenes/menu.js';

export class CollisionSystem {
    constructor(scene) {
        this.m_scene = scene;
    }

    update(entities) {
        const player = entities.find(e => e.components.tag?.name === 'player');
        if (!player) return;

        const px = player.components.position.x;
        const py = player.components.position.y;
        const pw = player.components.renderable.width;
        const ph = player.components.renderable.height;

        for (const entity of entities) {
            if (entity.components.tag?.name === 'meteor') {
                const mx = entity.components.position.x;
                const my = entity.components.position.y;
                const mw = entity.components.renderable.width;
                const mh = entity.components.renderable.height;

                const hit = (px + 10 < mx + mw) &&
                    (px + pw - 10 > mx) &&
                    (py + 10 < my + mh) &&
                    (py + ph - 10 > my);

                if (hit) {
                    const scene = new MenuScene(this.m_scene.m_game, this.m_scene.m_graphics, this.m_scene.m_input);
                    this.m_scene.m_game.switchScene(scene);
                }
            }
        }
    }
}
