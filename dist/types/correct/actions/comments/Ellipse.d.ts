import { fabric } from 'fabric';
import type CanvasWithImage from '../../CanvasWithImage';
import ActionBase from '../ActionBase';
/**
 * 用户可以设置的配置类型
 */
type EllipseConfigType = {
    opacity?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
};
declare class Ellipse extends ActionBase {
    _config: any;
    _curEllipse: fabric.Ellipse;
    _downPointer: fabric.Point;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: EllipseConfigType);
    _create(param: any): fabric.Ellipse;
    mousedown(pointer: fabric.Point): void;
    mousemove(pointer: fabric.Point): void;
    mouseup(pointer: fabric.Point): void;
    reset(): void;
}
export default Ellipse;
export { type EllipseConfigType };
