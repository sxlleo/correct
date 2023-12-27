import { fabric } from 'fabric';
import type CanvasWithImage from '../../CanvasWithImage';
import ActionBase from '../ActionBase';
import '@/util/ITextPatch';
declare class Text extends ActionBase {
    /**
     * 默认字体大小
     */
    defaultFontSize: number;
    _curText: any;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    _create(param: any): void;
    mousedown(pointer: fabric.Point): void;
    addListener(text: fabric.Object): void;
    reset(): void;
    destroy(): void;
}
export default Text;
