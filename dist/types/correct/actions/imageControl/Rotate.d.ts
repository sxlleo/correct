import ActionBase from '../ActionBase';
import type CanvasWithImage from '../../CanvasWithImage';
export default class Rotate extends ActionBase {
    /**
     * 旋转步长
     */
    ROTATE_STEP: number;
    /**
     * 当前旋转角度
     */
    _curRotate: number;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    _handleOn(): void;
    /**
     * 放大
     */
    _rotate(): void;
    reset(): void;
}
