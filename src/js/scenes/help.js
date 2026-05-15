import { Scene } from '../core/scene.js';
import { MenuScene } from './menu.js';

import { Positionable } from '../components/positionable.js';
import { Renderable } from '../components/renderable.js';
import { Hoverable } from '../components/hoverable.js';
import { Clickable } from '../components/clickable.js';

import { RenderSystem } from '../systems/render.js';
import { HoverSystem } from '../systems/hover.js';
import { ClickSystem } from '../systems/click.js';

export class HelpScene extends Scene {
    constructor(game, graphics, input) {
        super();

        this.m_game = game;
        this.m_graphics = graphics;
        this.m_input = input;
    }

    init() {
        this.addSystem(new RenderSystem(this.m_graphics));
        this.addSystem(new ClickSystem(this.m_input));
        this.addSystem(new HoverSystem(this.m_input));

        const width = this.m_graphics.m_canvas.width;
        const height = this.m_graphics.m_canvas.height;

        const hoverEffectAudio = new Audio('./../assets/sounds/hover.mp3');
        const clickAudioEffect = new Audio('./../assets/sounds/click.mp3');

        const backgroundImage = new Image(); backgroundImage.src = '../../assets/images/background.jpg';
        this.addEntity({
            components: {
                renderable: Renderable('image', { width: width, height: height, image: backgroundImage }),
                position: Positionable(0, 0),
            }
        });

        this.addEntity({
            components: {
                position: Positionable(width / 2, height / 5),
                renderable: Renderable('text', { data: 'Használd a WASD vagy nyíl billentyűket a meteoritok elkerüléséhez.', size: 36, color: '#fffffff' })
            }
        });

        this.addEntity({
            components: {
                position: Positionable(width / 2, height / 3.5),
                renderable: Renderable('text', { data: 'Játékot készítette:', size: 36, color: '#fffffff' })
            }
        });

        this.addEntity({
            components: {
                position: Positionable(width / 2, height / 3.5 + 50),
                renderable: Renderable('text', { data: 'Bálint Máté', size: 36, color: '#fffffff' })
            }
        });

        this.addEntity({
            components: {
                position: Positionable(width / 2, height / 3.5 + 100),
                renderable: Renderable('text', { data: 'TPMI5L', size: 36, color: '#fffffff' })
            }
        });

        const returnImage = new Image(); returnImage.src = '../../assets/images/arrow-left-circle-fill.svg';
        const returnImageHover = new Image(); returnImageHover.src = '../../assets/images/arrow-left-circle.svg';

        this.addEntity({
            components: {
                renderable: Renderable('image', { width: 50, height: 50, image: returnImage }),
                position: Positionable((width / 2) - 25, height / 2),
                hoverable: Hoverable(
                    (entity) => {
                        hoverEffectAudio.currentTime = 0;
                        hoverEffectAudio.play();

                        entity.components.renderable.image = returnImageHover;
                    },
                    (entity) => {
                        entity.components.renderable.image = returnImage;
                    }
                ),
                clickable: Clickable(() => {
                    clickAudioEffect.currentTime = 0; clickAudioEffect.play();
                    this.m_game.switchScene(new MenuScene(this.m_game, this.m_graphics, this.m_input));
                })
            }
        });
    }
}
