export class ControlSystem {
    constructor(inputManager, width, height) {
        this.m_input = inputManager;
        this.m_width = width;
        this.m_height = height;
    }

    update(entities) {
        const speed = 400;

        for (const entity of entities) {
            if (entity.components.tag?.name === 'player' && entity.components.velocity) {
                const vel = entity.components.velocity;
                const pos = entity.components.position;

                vel.x = 0;
                vel.y = 0;

                if (this.m_input.isKeyDown('w') || this.m_input.isKeyDown('arrowup')) vel.y = -speed;
                if (this.m_input.isKeyDown('s') || this.m_input.isKeyDown('arrowdown')) vel.y = speed;
                if (this.m_input.isKeyDown('a') || this.m_input.isKeyDown('arrowleft')) vel.x = -speed;
                if (this.m_input.isKeyDown('d') || this.m_input.isKeyDown('arrowright')) vel.x = speed;

                // 50x50-es méretű a hajó
                if (pos.x < 0) pos.x = 0;
                if (pos.x > this.m_width - 50) pos.x = this.m_width - 50;
                if (pos.y < 0) pos.y = 0;
                if (pos.y > this.m_height - 50) pos.y = this.m_height - 50;
            }
        }
    }
}
