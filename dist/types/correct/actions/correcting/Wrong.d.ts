import type CanvasWithImage from '../../CanvasWithImage';
import CorrectingBase from './CorrectingBase';
export default class Wrong extends CorrectingBase {
    _config: any;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any);
    reset(): void;
}