import type CanvasWithImage from '../../CanvasWithImage';
import CorrectingBase from './CorrectingBase';
export default class NotCompleteRight extends CorrectingBase {
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    reset(): void;
}
