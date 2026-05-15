export class SettingsManager {
    constructor(storage_key) {
        this.m_storageKey = storage_key;

        if (!localStorage.getItem(this.m_storageKey)) {
            this._saveSettings({});
        }
    }

    _getAllSettings() {
        const stored = localStorage.getItem(this.m_storageKey);
        return stored ? JSON.parse(stored) : {};
    }

    _saveSettings(settings) {
        localStorage.setItem(this.m_storageKey, JSON.stringify(settings));
    }

    get(key, default_value = null) {
        const settings = this._getAllSettings();
        return settings.hasOwnProperty(key) ? settings[key] : default_value;
    }

    set(key, value) {
        const settings = this._getAllSettings();
        settings[key] = value;
        this._saveSettings(settings);
    }

    remove(key) {
        const settings = this._getAllSettings();
        if (settings.hasOwnProperty(key)) {
            delete settings[key];
            this._saveSettings(settings);
        }
    }

    getAll() {
        return this._getAllSettings();
    }

    clear() {
        this._saveSettings({});
    }
}
