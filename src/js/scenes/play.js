import { Scene } from '../core/scene.js';

import { Positionable } from '../components/positionable.js';
import { Renderable } from '../components/renderable.js';
import { Hoverable } from '../components/hoverable.js';
import { Clickable } from '../components/clickable.js';
import { Velocity } from '../components/velocity.js';
import { Tag } from '../components/tag.js';

import { RenderSystem } from '../systems/render.js';
import { HoverSystem } from '../systems/hover.js';
import { ClickSystem } from '../systems/click.js';
import { ControlSystem } from '../systems/control.js'
import { MovementSystem } from '../systems/movement.js'
import { CollisionSystem } from '../systems/collision.js'
import { MeteorSpawnerSystem } from '../systems/meteorspawner.js'

export class PlayScene extends Scene {
    constructor(game, graphics, input) {
        super();

        this.m_game = game;
        this.m_graphics = graphics;
        this.m_input = input;
        this.m_timeSurvived = 0;
    }

    init() {
        const width = this.m_graphics.m_canvas.width;
        const height = this.m_graphics.m_canvas.height;

        this.addSystem(new ControlSystem(this.m_input, width, height));
        this.addSystem(new MovementSystem());
        this.addSystem(new MeteorSpawnerSystem(this, width, height));
        this.addSystem(new CollisionSystem(this));
        this.addSystem(new RenderSystem(this.m_graphics));

        const backgroundImage = new Image(); backgroundImage.src = './assets/images/background.jpg';
        this.addEntity({
            components: {
                renderable: Renderable('image', { width: width, height: height, image: backgroundImage }),
                position: Positionable(0, 0),
            }
        });

        const rocketImage = new Image(); rocketImage.src = './assets/images/rocket-fill.svg';
        this.addEntity({
            components: {
                tag: Tag('player'),
                position: Positionable(width / 2 - 25, height - 100),
                velocity: Velocity(0, 0),
                renderable: Renderable('image', { width: 50, height: 50, image: rocketImage })
            }
        });

        this.timerEntity = this.addEntity({
            components: {
                position: Positionable(width / 2, 50),
                renderable: Renderable('text', { data: 'Idő: 0.0s', size: 36, color: '#ffffff' })
            }
        });
    }

    update(deltaTime) {
        this.m_timeSurvived += deltaTime;
        this.timerEntity.components.renderable.data = `Idő: ${this.m_timeSurvived.toFixed(1)}s`;
        super.update(deltaTime);
    }
}
