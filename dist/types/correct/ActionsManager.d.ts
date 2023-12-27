import type { IActionsManager } from '@/interface/IActionsManager';
import { type ActionTypeInfo, type IconConfig } from '@/interface/ICorrectTool';
import type { IAction } from '@/interface/IAction';
import type CanvasWithImage from './CanvasWithImage';
import SnapshotManager from './SnapshotManager';
declare class ActionsManager implements IActionsManager {
    private _curActionType;
    /** 当前工具 */
    private _curTool;
    /**所有工具 */
    private _tools;
    /**当前舞台 */
    private _canvas;
    /**快照管理 */
    private _snapshotManager;
    /**图标相关信息配置 */
    private _iconConfig;
    /**批改工具id */
    private _correctId;
    private _isDisabled;
    constructor(correctId: string, canvas: CanvasWithImage);
    /**
     * 处理工具改变（没有提前创建，有的话使用，没有的话重新创建）
     * @param actionInfo 触发工具改变的参数
     */
    private _handleActionTypeChange;
    /**
     * 创建单个工具
     * @param type 工具类型
     * @param defClass 工具类型对应的类名
     * @returns 工具实例
     */
    private _createTool;
    /**
     * 撤销
     */
    private _undo;
    /**
     * 清理
     */
    clear(): void;
    /**
     * 销毁
     */
    destroy(): void;
    /**
     * 禁用
     * @param value
     */
    disable(value: boolean): void;
    /**
     * 设置当前操作
     * @param actionInfo 行为信息
     * @returns
     */
    setCurActionType(actionInfo: ActionTypeInfo): void;
    /**
     * 设置图标相关配置
     * @param iconConfig 图标配置
     */
    setIconConfig(iconConfig: IconConfig): void;
    /**
     * 和当前的action比较看是不是相同的一个
     * @param actionInfo
     * @returns
     */
    private _isSameAction;
    /**
     * 取消当前操作
     */
    private _cancelCurrentAction;
    /**
     * 保存快照
     */
    private _onSaveSnapshot;
    /**
     * 获取当前操作类型
     */
    get curActionType(): number;
    get curTool(): IAction;
    get snapshotManager(): SnapshotManager;
}
export default ActionsManager;
