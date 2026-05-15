export const Hoverable = (onEnterCallback, onLeaveCallback) => ({
    onEnter: onEnterCallback || (() => { }),
    onLeave: onLeaveCallback || (() => { }),
    isHovered: false
});
