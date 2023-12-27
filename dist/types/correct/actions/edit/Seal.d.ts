import type { fabric } from 'fabric';
import ActionBase from '../ActionBase';
import type CanvasWithImage from '../../CanvasWithImage';
export default class Seal extends ActionBase {
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    _handleOn(): void;
    _createImage(pointer?: fabric.Point): void;
    mousedown(pointer: fabric.Point): void;
    /**
     * 复制图片
     * @param pointer 插入图标位置
     * @param img 需要复制的图片
     */
    _onClone(pointer: fabric.Point, img: fabric.Image): void;
    reset(): void;
}
