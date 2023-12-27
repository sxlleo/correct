import type { ICorrectTool, ActionTypeInfo } from '@/interface/ICorrectTool';
import { type IconConfig } from '@/interface/ICorrectTool';
import type { ToolParamConfig } from '@/interface/IAction';
import CanvasWithImage from './CanvasWithImage';
import EventMitter from '@/util/EventEmitter';
declare class CorrectTool extends EventMitter implements ICorrectTool {
    static VERSION: string;
    canvas: CanvasWithImage;
    private _container;
    /** 触摸层 */
    private _touchWrapper;
    private _toolManager;
    private _correctId;
    private _isDisabled;
    private _prePanX;
    private _prePanY;
    private _preScale;
    private _hammerManager;
    private _curPinchActiveObject;
    _options: any;
    constructor(config: ToolParamConfig, options?: any);
    /**
     * 初始化canvas
     * @param config
     */
    private _initializeCanvas;
    /**
     * 初始化触摸事件
     */
    private _initializeTouchEvents;
    /**
     * 单指开始
     * @param e 事件对象
     * @returns
     */
    private _onPanStart;
    /**
     * 单指移动
     */
    private _onPanMoveHandle;
    /**
     * 单指移动结束
     * @param e 事件
     */
    private _onPanEndHandle;
    /**
     * 双指缩放
     * @param e 事件
     * @returns
     */
    private _onPinchStart;
    /**
     * 双指缩放移动
     */
    private _onPinchMoveHandle;
    /**
     * 双指缩放移动
     */
    private _onPinchEndHandle;
    /**
     * 双击事件处理
     * @param e 事件对象
     */
    private _onDoubleTap;
    /**
     * 单击事件处理
     * @param e 事件对象
     */
    private _onTap;
    /**
     * 获取相对于转换后的画布的坐标
     * @param x 相对于转换前画布的x坐标
     * @param y 相对于转换前画布的y坐标
     * @returns
     */
    private _getPointOfViewportTransformed;
    /**
     * 添加舞台对象变化侦听
     */
    private _addObjectListener;
    /**
     * 侦听正在编辑文本
     */
    private _onEditingEnterText;
    /**
     * 侦听退出编辑文本
     */
    private _onEditingExitedText;
    /**
     * 画布创建成功
     */
    private _onCanvasCreateSuccess;
    /**
     * 侦听创建对象
     * @param objInfo 对象信息
     */
    private _onObjectCreated;
    /**
     * 侦听移除对象
     * @param objInfo 对象信息
     */
    private _onObjectRemoved;
    /**
     * 侦听舞台对象变化
     * @param type 对象操作类型 'create' | 'delete'
     * @param obj 对象
     */
    private _onObjectsChange;
    /**
     * 创建canvas节点
     * @param container 节点容器
     * @returns
     */
    private _createCanvasEle;
    /**
     * 单指拖动canvas画布
     * @param deltaX △x
     * @param deltaY △y
     * @returns 是否移动成功
     */
    private _pan;
    /**
     *【Touch】双指缩放画布
     * @param centerPoint 缩放中心点
     * @param scale 增量的缩放比例
     */
    private _pinch;
    /**
     *【Touch】双指缩放对象
     * @param target 缩放目标对象
     * @param position 增量的位移
     * @param scale 增量的缩放比例
     */
    private _pinchObject;
    /**
     * 禁用
     * @param value 是否禁用
     */
    disable(value: boolean): void;
    /**
     * 设置当前操作
     */
    setCurActionTypeInfo(actionTypeInfo: ActionTypeInfo): void;
    setIconConfig(iconConfig: IconConfig): void;
    /**
     * 获取当前操作类型
     */
    get curActionType(): number;
    /**
     * 获取当前批改id
     */
    get correctId(): string;
    /**
     * 重置
     */
    reset(): void;
    /**
     * 销毁
     */
    destroy(): void;
}
export default CorrectTool;
