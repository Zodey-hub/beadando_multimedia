import { Game } from './core/game.js';
import { Graphics } from './managers/graphics.js';
import { Input } from './managers/input.js';
import { MenuScene } from './scenes/menu.js';

const graphics = new Graphics();
const input = new Input();

const game = new Game();
const startScene = new MenuScene(game, graphics, input);
game.start(startScene);
