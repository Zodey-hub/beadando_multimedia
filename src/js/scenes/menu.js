import { Scene } from '../core/scene.js';
import { PlayScene } from './play.js'
import { SettingsScene } from './settings.js'
import { HelpScene } from './help.js'

import { Positionable } from '../components/positionable.js';
import { Renderable } from '../components/renderable.js';
import { Hoverable } from '../components/hoverable.js';
import { Clickable } from '../components/clickable.js';

import { RenderSystem } from '../systems/render.js';
import { HoverSystem } from '../systems/hover.js';
import { ClickSystem } from '../systems/click.js';

export class MenuScene extends Scene {
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

        const hoverEffectAudio = new Audio('./assets/sounds/hover.mp3');
        const clickAudioEffect = new Audio('./assets/sounds/click.mp3');

        const backgroundImage = new Image(); backgroundImage.src = './assets/images/background.jpg';
        this.addEntity({
            components: {
                renderable: Renderable('image', { width: width, height: height, image: backgroundImage }),
                position: Positionable(0, 0),
            }
        });

        const codeImage = new Image(); codeImage.src = './assets/images/file-earmark-code-fill.svg';
        const codeImageHover = new Image(); codeImageHover.src = './assets/images/file-earmark-code.svg';
        this.addEntity({
            components: {
                renderable: Renderable('image', { width: 50, height: 50, image: codeImage }),
                position: Positionable(10, 10),

                hoverable: Hoverable(
                    // onEnter
                    (entity) => {
                        {
                            hoverEffectAudio.currentTime = 0;
                            hoverEffectAudio.play();
                        }

                        {
                            entity.components.renderable.image = codeImageHover;
                        }
                    },

                    // onLeave
                    (entity) => {
                        entity.components.renderable.image = codeImage;
                    }
                ),

                clickable: Clickable((_entity) => {
                    clickAudioEffect.currentTime = 0; clickAudioEffect.play();
                    window.open('https://github.com/Zodey-hub/beadando_multimedia', '_blank');
                })
            }
        });

        const helpImage = new Image(); helpImage.src = './assets/images/question-circle-fill.svg';
        const helpImageHover = new Image(); helpImageHover.src = './assets/images/question-circle.svg';
        this.addEntity({
            components: {
                renderable: Renderable('image', { width: 50, height: 50, image: helpImage }),
                position: Positionable(1280 - 60 - 50 - 10, 10),

                hoverable: Hoverable(
                    // onEnter
                    (entity) => {
                        {
                            hoverEffectAudio.currentTime = 0;
                            hoverEffectAudio.play();
                        }

                        {
                            entity.components.renderable.image = helpImageHover;
                        }
                    },

                    // onLeave
                    (entity) => {
                        entity.components.renderable.image = helpImage;
                    }
                ),

                clickable: Clickable((_entity) => {
                    clickAudioEffect.currentTime = 0; clickAudioEffect.play();
                    this.m_game.switchScene(new HelpScene(this.m_game, this.m_graphics, this.m_input));
                })
            }
        });

        const settingsImage = new Image(); settingsImage.src = './assets/images/gear-fill.svg';
        const settingsImageHover = new Image(); settingsImageHover.src = './assets/images/gear.svg';
        this.addEntity({
            components: {
                renderable: Renderable('image', { width: 50, height: 50, image: settingsImage }),
                position: Positionable(1280 - 60, 10),

                hoverable: Hoverable(
                    // onEnter
                    (entity) => {
                        {
                            hoverEffectAudio.currentTime = 0;
                            hoverEffectAudio.play();
                        }

                        {
                            entity.components.renderable.image = settingsImageHover;
                        }
                    },

                    // onLeave
                    (entity) => {
                        entity.components.renderable.image = settingsImage;
                    }
                ),

                clickable: Clickable((_entity) => {
                    clickAudioEffect.currentTime = 0; clickAudioEffect.play();
                    this.m_game.switchScene(new SettingsScene(this.m_game, this.m_graphics, this.m_input));
                })
            }
        });

        this.addEntity({
            components: {
                position: Positionable((1280 / 2), (720 / 3)),
                renderable: Renderable('text', { data: 'Space dodger', size: 100, color: '#000000' }),
            }
        });

        const playImage = new Image(); playImage.src = './assets/images/play-circle-fill.svg';
        const playImageHover = new Image(); playImageHover.src = './assets/images/play-circle.svg';
        this.addEntity({
            components: {
                renderable: Renderable('image', { width: 100, height: 100, image: playImage }),
                position: Positionable(1280 / 2 - 50, 720 / 2),

                hoverable: Hoverable(
                    // onEnter
                    (entity) => {
                        {
                            hoverEffectAudio.currentTime = 0;
                            hoverEffectAudio.play();
                        }

                        {
                            entity.components.renderable.image = playImageHover;
                        }
                    },

                    // onLeave
                    (entity) => {
                        entity.components.renderable.image = playImage;
                    }
                ),

                clickable: Clickable((_entity) => {
                    clickAudioEffect.currentTime = 0; clickAudioEffect.play();
                    this.m_game.switchScene(new PlayScene(this.m_game, this.m_graphics, this.m_input));
                })
            }
        });
    }
}
