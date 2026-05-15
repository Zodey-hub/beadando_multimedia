import { SettingsManager } from '../managers/settings.js';


const storage = new SettingsManager('multimedia_jatek_beallitasok');

export const GameSettings = {
    speed: storage.get('speed', 1.0),
};

export function saveSettings() {
    storage.set('speed', GameSettings.speed);
}
