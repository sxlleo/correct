import type { fabric } from 'fabric';
import type { IActionsManager } from '../interface/IActionsManager';
import { type ActionTypeInfo } from '../interface/ICorrectTool';
import type { IAction } from '../interface/IAction';
import type CanvasWithImage from './CanvasWithImage';
declare class ActionsManager implements IActionsManager {
    private _curActionType;
    /**
     * 当前工具
     */
    private _curTool;
    /**
     * 所有工具
     */
    _tools: any;
    /**
     * 舞台上所有创建完成的对象
     */
    _objs: fabric.Object[];
    /**
     * 当前舞台
     */
    _canvas: CanvasWithImage;
    private _correctId;
    constructor(correctId: string, canvas: CanvasWithImage);
    /**
     * 处理工具改变（没有提前创建，有的话使用，没有的话重新创建）
     * todo: actionInfo类型待定义
     * @param actionInfo 触发工具改变的参数
     */
    private _handleActionTypeChange;
    /**
     * 创建单个工具
     * @param type 工具类型
     * @param defClass 工具类型对应的类名
     * @returns 工具实例
     */
    _createTool(type: number, defClass: any): IAction;
    /**
     * 清理
     */
    _clear(): void;
    /**
     * 销毁
     */
    destroy(): void;
    /**
     * 设置当前操作
     * @param actionInfo 行为信息
     * @returns
     */
    setCurActionType(actionInfo: ActionTypeInfo): void;
    /**
     * 获取当前操作类型
     */
    get curActionType(): number;
    get curTool(): IAction;
}
export default ActionsManager;
