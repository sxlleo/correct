import type CanvasWithImage from '../../CanvasWithImage';
import ActionBase from '../ActionBase';
export default class Zoom extends ActionBase {
    OUT_MAX: number;
    ZOOM_STEP: number;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    _handleOn(): void;
    /**
     * 放大
     */
    _zoomIn(): void;
    /**
     * 缩小
     */
    _zoomOut(): void;
    reset(): void;
}
