export class HoverSystem {
    constructor(inputManager) {
        this.m_input = inputManager;
    }

    update(entities) {
        const mouse = this.m_input.mouse;

        for (const entity of entities) {
            if (!entity.components.position || !entity.components.renderable || !entity.components.hoverable) continue;

            const pos = entity.components.position;
            const visual = entity.components.renderable;
            const hover = entity.components.hoverable;

            let isMouseInside = false;

            if (visual.type === 'rect' || visual.type === 'image') {
                isMouseInside = mouse.x >= pos.x && mouse.x <= pos.x + visual.width &&
                    mouse.y >= pos.y && mouse.y <= pos.y + visual.height;
            } else if (visual.type === 'circle') {
                const dx = mouse.x - pos.x;
                const dy = mouse.y - pos.y;
                isMouseInside = (dx * dx + dy * dy) <= (visual.radius * visual.radius);
            }

            if (isMouseInside && !hover.isHovered) {
                hover.isHovered = true;
                hover.onEnter(entity);
            }

            if (!isMouseInside && hover.isHovered) {
                hover.isHovered = false;
                hover.onLeave(entity);
            }
        }
    }
}
