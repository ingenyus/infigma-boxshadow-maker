/*

Plugin Name: InFigma Box Shadow Creator
Description: Create Box Shadow effect for figma
Author: Cesar Novoa | ingenyus*

*/
// Show Plugin
figma.showUI(__html__, { width: 300, height: 400 });
// Message from "frontend"
figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case "checkStyles":
            return useCheckStyles();
        default:
            return;
    }
};
// Uses
const useCheckStyles = () => {
    const paintStyles = figma.getLocalPaintStyles().filter((paintStyle) => {
        let color = paintStyle.paints[0];
        return color.type === "SOLID";
    });
    const colors = paintStyles.map((paintStyle) => {
        let color = paintStyle.paints[0];
        const rgba = {
            red: BeautifyColor(color.color.r),
            green: BeautifyColor(color.color.g),
            blue: BeautifyColor(color.color.b),
            alpha: BeautifyColor(color.opacity),
        };
        const ColorStyle = RGBToHex(rgba);
        return {
            name: fixName(paintStyle.name),
            color: ColorStyle,
        };
    });
    figma.ui.postMessage({ type: "checkedStyles", data: colors });
};
// Fixers
const fixName = (str) => {
    const item = str.split("/");
    return item.join("--");
};
const BeautifyColor = (colorValue) => {
    return Math.round(colorValue * 255);
};
const ColorToHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex.toUpperCase();
};
const RGBToHex = (rgba) => {
    const red = ColorToHex(rgba.red);
    const green = ColorToHex(rgba.green);
    const blue = ColorToHex(rgba.blue);
    const alpha = ColorToHex(rgba.alpha);
    if (alpha === "FF")
        return `#${red}${green}${blue}`;
    return `#${red}${green}${blue}${alpha}`;
};
