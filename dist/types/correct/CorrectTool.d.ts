import type { ICorrectTool, ActionTypeInfo } from '../interface/ICorrectTool';
import type { ToolParamConfig } from '../interface/IAction';
import CanvasWithImage from './CanvasWithImage';
import EventMitter from '../util/EventEmitter';
import '../util/createDeleteIconControl';
declare class CorrectTool extends EventMitter implements ICorrectTool {
    static VERSION: string;
    canvas: CanvasWithImage;
    private _container;
    private _toolManager;
    private _correctId;
    private _isDisabled;
    /**
     * 被添加的元素
     * todo: 如果Object实例身上可以被挂在属性，则可以不维护_addedObjects
     */
    _addedObjects: any[];
    constructor(config: ToolParamConfig);
    /**
     * 初始化canvas
     * @param config
     */
    private _initializeCanvas;
    /**
     * 添加舞台对象变化侦听
     */
    private _addObjectListener;
    /**
     * 侦听舞台对象变化
     * @param type 对象操作类型 'create' | 'delete'
     */
    private _onObjectsChange;
    private _addCanvasEventListener;
    private _onMouseDown;
    private _onMouseMove;
    private _onMouseUp;
    private _createCanvasEle;
    /**
     * 全屏
     */
    fullscreen(value: boolean): void;
    /**
     * 禁用
     * @param value 是否禁用
     */
    disable(value: boolean): void;
    /**
     * 重置
     */
    reset(): void;
    /**
     * 销毁
     */
    destroy(): void;
    /**
     * 是否被编辑过
     */
    get isEdited(): boolean;
    /**
     * 设置当前操作
     */
    setCurActionTypeInfo(actionTypeInfo: ActionTypeInfo): void;
    /**
     * 获取当前操作类型
     */
    get curActionType(): number;
    /**
     * 获取当前批改id
     */
    get correctId(): string;
}
export default CorrectTool;
