export class MovementSystem {
    constructor() { }

    update(entities, deltaTime) {
        for (const entity of entities) {
            if (!entity.components.position || !entity.components.velocity) continue;

            entity.components.position.x += entity.components.velocity.x * deltaTime;
            entity.components.position.y += entity.components.velocity.y * deltaTime;
        }
    }
}
