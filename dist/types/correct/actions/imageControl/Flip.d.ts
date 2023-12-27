import ActionBase from '../ActionBase';
import type CanvasWithImage from '../../CanvasWithImage';
export default class Flip extends ActionBase {
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    _handleOn(): void;
    /**
     * 镜像
     */
    _Flip(): void;
    reset(): void;
}
