import type CanvasWithImage from '@/correct/CanvasWithImage';
import CorrectingBase from './CorrectingBase';
export default class Right extends CorrectingBase {
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    reset(): void;
}
