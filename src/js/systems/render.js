export class RenderSystem {
    constructor(graphicsManager) {
        this.m_graphics = graphicsManager;
    }

    update(entities) {
        this.m_graphics.clear();

        for (const entity of entities) {
            if (!entity.components.position || !entity.components.renderable) continue;

            const pos = entity.components.position;
            const visual = entity.components.renderable;

            switch (visual.type) {
                case 'rect':
                    this.m_graphics.drawRect(pos.x, pos.y, visual.width, visual.height, visual.color);
                    break;
                case 'circle':
                    this.m_graphics.drawCircle(pos.x, pos.y, visual.radius, visual.color);
                    break;
                case 'image':
                    this.m_graphics.drawImage(pos.x, pos.y, visual.width, visual.height, visual.image);
                    break;
                case 'text':
                    this.m_graphics.drawText(pos.x, pos.y, visual.data, visual.size, visual.color);
                    break;
                default:
                    console.warn(`Unknown renderable type: ${visual.type}`);
            }
        }
    }
}
