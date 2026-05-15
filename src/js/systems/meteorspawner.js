import { Positionable } from '../components/positionable.js';
import { Renderable } from '../components/renderable.js';
import { Velocity } from '../components/velocity.js';
import { Tag } from '../components/tag.js';
import { GameSettings } from '../core/settings.js'

export class MeteorSpawnerSystem {
    constructor(scene, screenWidth, screenHeight) {
        this.m_scene = scene;
        this.m_width = screenWidth;
        this.m_height = screenHeight;
        this.m_spawnTimer = 0;
        this.m_starImage = new Image(); this.m_starImage.src = '../../assets/images/stars.svg';
    }

    update(entities, deltaTime) {
        this.m_spawnTimer += deltaTime;

        for (const e of entities) {
            if (e.components.tag?.name === 'meteor') {
                e.components.velocity.y += (200 * GameSettings.speed) * deltaTime;
            }
        }

        const spawnInterval = 0.4 / GameSettings.speed;
        if (this.m_spawnTimer > spawnInterval) {
            this.m_spawnTimer = 0;

            this.m_scene.addEntity({
                components: {
                    tag: Tag('meteor'),
                    position: Positionable(Math.random() * (this.m_width - 40), -50),
                    velocity: Velocity(0, (100 + Math.random() * 200) * GameSettings.speed),
                    renderable: Renderable('image', { width: 40, height: 40, image: this.m_starImage })
                }
            });
        }

        this.m_scene.m_entities = this.m_scene.m_entities.filter(e => {
            return !(e.components.tag?.name === 'meteor' && e.components.position.y > this.m_height);
        });
    }
}
