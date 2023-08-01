import type { fabric } from 'fabric';
import ActionBase from '../ActionBase';
import type CanvasWithImage from '../../CanvasWithImage';
export default class Seal extends ActionBase {
    _config: any;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any);
    _handleOn(): void;
    _createImage(): void;
    _onClone(img: fabric.Image): void;
    reset(): void;
}
