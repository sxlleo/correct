type IconMapBeforeLoad = {
    [key: string | number]: string;
};
declare function loadImage(url: string): Promise<any>;
declare const iconsLoaded: {};
declare function preloadIcon(iconMapBeforeLoad: IconMapBeforeLoad): Promise<any>;
export { preloadIcon, loadImage, iconsLoaded };
