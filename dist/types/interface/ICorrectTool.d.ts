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
    /**文本 */
    Text = 1,
    /**圆 */
    Circle = 2,
    /**波浪线 */
    WavyLine = 3,
    /**印章 */
    Seal = 4,
    /**铅笔 */
    Pencil = 5,
    /**评论 */
    Remark = 6,
    /**表扬 */
    Praise = 7,
    /**对 */
    Right = 8,
    /**错 */
    Wrong = 9,
    /**未完成 */
    NotCompleteRight = 10,
    /**放大/缩小 */
    Zoom = 11,
    /**旋转 */
    Rotate = 12,
    /**镜像水平翻转 */
    Flip = 13,
    /**清理 */
    Clean = 14,
    /**撤销 */
    Undo = 15
}
/**
 * 缩放类型
 */
declare enum Zoom {
    In = 1,
    Out = 2
}
/**
 * 舞台上元素的图标
 */
declare enum IconsInCanvas {
    /**加油 */
    EncourageOfSeal = 1,
    /**优秀 */
    ExcellentOfSeal = 2,
    /**完美 */
    PerfectOfSeal = 3,
    /**待批改 */
    UncorrectOfSeal = 4,
    /**你真棒 */
    GreatOfSeal = 5,
    /**半错 */
    NotCompleteRight = 6,
    /**正确 */
    Right = 7,
    /**错误 */
    Wrong = 8,
    /**表扬 */
    Praise = 9
}
/**
 * 印章参数
 */
type SealParamsOfActionType = {
    /**印章类型 */
    insertIconType: number;
    /**添加的点 */
    pointer: {
        x: number;
        y: number;
    };
};
/**
 * 缩放的参数
 */
type ZoomParamsOfActionType = {
    /**缩放类型 */
    type: number;
};
/**
 * 评论工具的参数
 */
type RemarkParamsOfActionType = {
    /**缩放类型 */
    text: number;
    /**添加的点 */
    pointer: {
        x: number;
        y: number;
    };
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
    params?: SealParamsOfActionType | ZoomParamsOfActionType | RemarkParamsOfActionType | null;
    /**需要拓展到舞台对象上的参数 */
    externalParams: Record<string | number, any>;
};
/**图标配置 */
type IconConfig = {
    scaleX: number;
    scaleY: number;
};
export type { ICorrectTool, ActionTypeInfo, SealParamsOfActionType, ZoomParamsOfActionType, RemarkParamsOfActionType, IconConfig, };
export { Controls, IconsInCanvas, Zoom };
