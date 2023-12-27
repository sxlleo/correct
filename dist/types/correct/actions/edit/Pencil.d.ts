import ActionBase from '../ActionBase';
import type CanvasWithImage from '../../CanvasWithImage';
export default class Pencil extends ActionBase {
    /**
     * 批改工具被禁用，批改工具被禁用的话，画笔无法操作
     */
    private isDisabled;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean, config?: any);
    /** 初始化画笔信息 */
    _initializeBrush(): void;
    _onCreated(e: any): void;
    _handleOn(): void;
    _handleOff(): void;
    /**
     * 禁用
     * @param value 是否禁用
     */
    disable(value: boolean): void;
    reset(): void;
    destroy(): void;
}
