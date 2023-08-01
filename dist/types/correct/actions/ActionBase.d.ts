import type CanvasWithImage from '../CanvasWithImage';
import type { fabric } from 'fabric';
import type { IAction } from '../../interface/IAction';
import EventMitter from '../../util/EventEmitter';
export default class ActionBase extends EventMitter implements IAction {
    isKeep: boolean;
    protected canvas: CanvasWithImage;
    /**
     * 是否开启工具
     */
    protected isOn: boolean;
    /**
     * 触发工具携带的参数，不同的工具，此参数类型各不相同
     */
    protected triggerParams: any;
    /**
     * 工具类型
     */
    _type: number;
    /**
     * 批改的unique id
     */
    correctId: string;
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep?: boolean);
    trigger(stateObj: any): void;
    _handleOn(): void;
    _handleOff(): void;
    addListener(obj: fabric.Object): void;
    destroy(): void;
    reset(): void;
}
