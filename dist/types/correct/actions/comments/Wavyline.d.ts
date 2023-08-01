import { fabric } from 'fabric';
import type CanvasWithImage from '../../CanvasWithImage';
import ActionBase from '../ActionBase';
type WavylineConfigType = {
    rang?: number;
    strokeWidth?: number;
    minPeriod?: number;
};
declare class Wavyline extends ActionBase {
    _config: any;
    _curLine: fabric.Path;
    /**
     * 鼠标按下点
     */
    _downPointer: fabric.Point;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: WavylineConfigType);
    mousedown(pointer: fabric.Point): void;
    mousemove(pointer: fabric.Point): void;
    mouseup(pointer: fabric.Point): void;
    _draw(pointer: fabric.Point): void;
    _caculatePeriodAndNumByDistance(startPoint: fabric.Point, endPoint: fabric.Point): any;
    _create(pathData: string, angle: number): fabric.Path;
    reset(): void;
}
export default Wavyline;
export { type WavylineConfigType };
