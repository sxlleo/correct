import type { fabric } from 'fabric';
import ActionBase from '../ActionBase';
import type CanvasWithImage from '@/correct/CanvasWithImage';
declare class CorrectingBase extends ActionBase {
    /**
     * 加载完成的图标
     */
    _loadedIcon: fabric.Image | Promise<any>;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    /**
     * 复制图片回调
     * @param pointer 创建的图片的位置
     * @param img 图片实例对象
     */
    _onClone(pointer: fabric.Point, img: fabric.Image): void;
    mousedown(pointer: fabric.Point): void;
    destroy(): void;
}
export default CorrectingBase;
