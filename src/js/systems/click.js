export class ClickSystem {
    constructor(inputManager) {
        this.m_input = inputManager;
    }

    update(entities) {
        if (!this.m_input.mouse.clicked) return;

        const mouse = this.m_input.mouse;
        let wasSomethingClicked = false;

        for (const entity of entities) {
            if (!entity.components.position || !entity.components.renderable || !entity.components.clickable) continue;

            const pos = entity.components.position;
            const visual = entity.components.renderable;
            const clickable = entity.components.clickable;

            let isMouseInside = false;

            if (visual.type === 'rect' || visual.type === 'image') {
                isMouseInside = mouse.x >= pos.x && mouse.x <= pos.x + visual.width &&
                    mouse.y >= pos.y && mouse.y <= pos.y + visual.height;

            } else if (visual.type === 'circle') {
                const dx = mouse.x - pos.x;
                const dy = mouse.y - pos.y;
                isMouseInside = (dx * dx + dy * dy) <= (visual.radius * visual.radius);
            }

            if (isMouseInside) {
                clickable.onClick(entity);
                wasSomethingClicked = true;
            }
        }

        this.m_input.mouse.clicked = false;
    }
}
