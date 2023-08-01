import type CanvasWithImage from '@/correct/CanvasWithImage';
import CorrectingBase from './CorrectingBase';
export default class Right extends CorrectingBase {
    _config: any;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any);
    reset(): void;
}
