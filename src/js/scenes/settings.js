import { Scene } from '../core/scene.js';
import { MenuScene } from './menu.js';

import { GameSettings, saveSettings } from '../core/settings.js';

import { Positionable } from '../components/positionable.js';
import { Renderable } from '../components/renderable.js';
import { Hoverable } from '../components/hoverable.js';
import { Clickable } from '../components/clickable.js';

import { RenderSystem } from '../systems/render.js';
import { HoverSystem } from '../systems/hover.js';
import { ClickSystem } from '../systems/click.js';

export class SettingsScene extends Scene {
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

        const speedTextEntity = {
            components: {
                position: Positionable(width / 2, height / 3),
                renderable: Renderable('text', { data: `Sebesség: ${GameSettings.speed}x`, size: 36, color: '#ffffff' })
            }
        };
        this.addEntity(speedTextEntity);

        const arrowY = (height / 3) - 25;

        const leftArrow = new Image(); leftArrow.src = '../../assets/images/arrow-left-square.svg';
        const leftArrowFill = new Image(); leftArrowFill.src = '../../assets/images/arrow-left-square-fill.svg';
        this.addEntity({
            components: {
                position: Positionable((width / 2) - 175, arrowY),
                renderable: Renderable('image', { width: 50, height: 50, image: leftArrow }),
                hoverable: Hoverable(
                    (entity) => {
                        hoverEffectAudio.currentTime = 0; hoverEffectAudio.play();
                        entity.components.renderable.image = leftArrowFill;
                    },
                    (entity) => entity.components.renderable.image = leftArrow
                ),
                clickable: Clickable(() => {
                    clickAudioEffect.currentTime = 0; clickAudioEffect.play();

                    GameSettings.speed -= 0.5;
                    if (GameSettings.speed < 0.5) { GameSettings.speed = 3.0; }

                    speedTextEntity.components.renderable.data = `Sebesség: ${GameSettings.speed}x`;
                })
            }
        });

        const rightArrow = new Image(); rightArrow.src = '../../assets/images/arrow-right-square.svg';
        const rightArrowFill = new Image(); rightArrowFill.src = '../../assets/images/arrow-right-square-fill.svg';
        this.addEntity({
            components: {
                position: Positionable((width / 2) + 125, arrowY),
                renderable: Renderable('image', { width: 50, height: 50, image: rightArrow }),
                hoverable: Hoverable(
                    (entity) => {
                        hoverEffectAudio.currentTime = 0; hoverEffectAudio.play();
                        entity.components.renderable.image = rightArrowFill;
                    },
                    (entity) => entity.components.renderable.image = rightArrow
                ),
                clickable: Clickable(() => {
                    clickAudioEffect.currentTime = 0; clickAudioEffect.play();

                    GameSettings.speed += 0.5;
                    if (GameSettings.speed > 3.0) { GameSettings.speed = 0.5; }

                    speedTextEntity.components.renderable.data = `Sebesség: ${GameSettings.speed}x`;
                })
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
                    saveSettings();
                    this.m_game.switchScene(new MenuScene(this.m_game, this.m_graphics, this.m_input));
                })
            }
        });
    }
}
