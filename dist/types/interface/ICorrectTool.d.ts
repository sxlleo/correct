interface ICorrectTool {
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
}
declare enum Controls {
    Text = 1,
    Circle = 2,
    WavyLine = 3,
    Seal = 4,
    Right = 5,
    Wrong = 6,
    NotCompleteRight = 7,
    Zoom = 8,
    Rotate = 9,
    Flip = 10,
    Clean = 11
}
/**
 * 缩放类型
 */
declare enum Zoom {
    In = 1,
    Out = 2
}
/**
 * 舞台上的图标
 */
declare enum IconsInCanvas {
    EncourageOfSeal = 1,
    ExcellentOfSeal = 2,
    PerfectOfSeal = 3,
    UncorrectOfSeal = 4,
    GreatOfSeal = 5,
    NotCompleteRight = 6,
    Right = 7,
    Wrong = 8
}
/**
 * 印章参数
 */
type SealParamsOfActionType = {
    insertIconType: number;
};
/**
 * 缩放的参数
 */
type ZoomParamsOfActionType = {
    insertIconType: number;
};
type ActionTypeInfo = {
    /**
     * 行为类型
     */
    actionType: number;
    /**
     * 此行为是否可以一直选中
     */
    isKeep: boolean;
    /**
     * 触发行为携带的参数，不同的行为，此参数类型各不相同
     */
    params?: SealParamsOfActionType | ZoomParamsOfActionType | null;
};
export type { ICorrectTool, ActionTypeInfo, SealParamsOfActionType, ZoomParamsOfActionType };
export { Controls, IconsInCanvas, Zoom };
