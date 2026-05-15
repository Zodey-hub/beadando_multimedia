export class Scene {
    constructor() {
        this.m_systems = [];
        this.m_entities = [];
        this.m_nextEntityId = 1;
    }

    init() { }

    addSystem(system) {
        this.m_systems.push(system);
    }

    addEntity(entity) {
        entity.id = this.m_nextEntityId++;
        this.m_entities.push(entity);
        return entity;
    }

    update(deltaTime) {
        for (const system of this.m_systems) {
            system.update(this.m_entities, deltaTime);
        }
    }
}
