export const Clickable = (onClickCallback) => ({
    onClick: onClickCallback || (() => { })
});
