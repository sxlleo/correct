import ActionBase from '../ActionBase';
import type CanvasWithImage from '../../CanvasWithImage';
export default class Flip extends ActionBase {
    _config: any;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any);
    _handleOn(): void;
    /**
     * 镜像
     */
    _Flip(): void;
    reset(): void;
}
