/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-01-29 19:13:22
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-03-10 16:21:38
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/correctsManager/core/interface/ICorrectTool.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */
interface ICorrectTool {
  // _curState: number
  /**
   * 禁用
   * @param value 是否禁用
   */
  disable(value: boolean): void
  /**
   * 重置
   */
  reset(): void
  /**
   * 销毁
   */
  destroy(): void
}

enum Controls {
  // 批注
  // 文本
  Text = 1,
  // 圆
  Circle,
  // 波浪线
  WavyLine,
  // 印章
  Seal,

  // 批改
  // 对
  Right,
  // 错
  Wrong,
  // 未完成
  NotCompleteRight,

  // 图片编辑
  // 放大/缩小
  Zoom,
  // 旋转
  Rotate,
  // 镜像水平翻转
  Flip,
  // 清理
  Clean
}
/**
 * 缩放类型
 */
enum Zoom {
  In = 1,
  Out
}

/**
 * 舞台上的图标
 */
enum IconsInCanvas {
  // 加油
  EncourageOfSeal = 1,
  // 优秀
  ExcellentOfSeal,
  // 完美
  PerfectOfSeal,
  // 待批改
  UncorrectOfSeal,
  // 你真棒
  GreatOfSeal,
  // 半错
  NotCompleteRight,
  // 正确
  Right,
  // 错误
  Wrong
}

/**
 * 印章参数
 */
type SealParamsOfActionType = {
  insertIconType: number
}
/**
 * 缩放的参数
 */
type ZoomParamsOfActionType = {
  insertIconType: number
}
// todo: 后期是否可以将isKeep的设置统一
type ActionTypeInfo = {
  /**
   * 行为类型
   */
  actionType: number
  /**
   * 此行为是否可以一直选中
   */
  isKeep: boolean
  /**
   * 触发行为携带的参数，不同的行为，此参数类型各不相同
   */
  params?: SealParamsOfActionType | ZoomParamsOfActionType | null
}

export type { ICorrectTool, ActionTypeInfo, SealParamsOfActionType, ZoomParamsOfActionType }
export { Controls, IconsInCanvas, Zoom }
