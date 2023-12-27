import type CanvasWithImage from '../CanvasWithImage';
import type { fabric } from 'fabric';
import type { IAction } from '@/interface/IAction';
import EventMitter from '@/util/EventEmitter';
export default class ActionBase extends EventMitter implements IAction {
    /**
     * 是否一直选中
     */
    isKeep: boolean;
    /**
     * 画布
     */
    protected canvas: CanvasWithImage;
    /**
     * 是否开启工具
     */
    protected isOn: boolean;
    /**
     * 触发工具携带的参数，不同的工具，此参数类型各不相同
     */
    _triggerParams: any;
    externalParams: Record<string | number, any>;
    /**
     * 工具类型
     */
    _type: number;
    /**
     * 批改的unique id
     */
    correctId: string;
    /**
     * 工具配置
     */
    _config: any;
    /**
     * 缓存所有添加过的对象
     */
    _cacheObjects: fabric.Object[];
    constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep: boolean, config: any);
    trigger(stateObj: any): void;
    _handleOn(): void;
    _handleOff(): void;
    /**
     * 给对象添加侦听事件
     * @param obj 对象实例
     * @param isAdded 是否已经添加到画布
     */
    addListener(obj: fabric.Object, isAdded?: boolean): void;
    /**对象被添加 */
    private _onAdded;
    /**对象被移除 */
    _removed(): void;
    /**
     * 撤销修改
     * @param target 当前操作的对象
     * @param originalViewportTransform 原始的坐标信息
     * @returns {Function}
     */
    private _undoModified;
    /**
     * 撤销添加
     * @param target
     * @returns {Function}
     */
    private _undoAdd;
    /**
     * 撤销移出
     * @param target
     * @param canvas
     * @returns {Function}
     */
    private _undoRemove;
    /**
     * 设置对象原始信息，撤销对象的修改会用到
     * @param obj 对象
     */
    private _setOriginalViewportTransformBeforeModified;
    /**
     * 更新配置
     * @param config 配置文件
     */
    updateConfig(config: any): void;
    get triggerParams(): any;
    get type(): number;
    destroy(): void;
    reset(): void;
}
