import { fabric } from 'fabric';
import type CanvasWithImage from '../../CanvasWithImage';
import ActionBase from '../ActionBase';
import '@/util/ITextPatch';
declare class Remark extends ActionBase {
    /**
     * 默认字体大小
     */
    defaultFontSize: number;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    _handleOn(): void;
    mousedown(pointer: fabric.Point): void;
    _create(pointer?: any): void;
    addListener(text: fabric.Object): void;
    reset(): void;
}
export default Remark;
