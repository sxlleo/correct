import { fabric } from 'fabric';
import type CanvasWithImage from '../../CanvasWithImage';
import ActionBase from '../ActionBase';
declare class Text extends ActionBase {
    _config: any;
    _curText: any;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any);
    _create(param: any): void;
    _handleOff(): void;
    mousedown(pointer: fabric.Point): void;
    _removeEmptyText(): void;
    reset(): void;
}
export default Text;
