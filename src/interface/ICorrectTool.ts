/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-29 19:13:22
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-06-28 14:33:31
 * @FilePath: /jzx-correct-mobile/src/interface/ICorrectTool.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
interface ICorrectTool {
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
  /**文本 */
  Text = 1,
  /**圆 */
  Circle,
  /**波浪线 */
  WavyLine,
  /**印章 */
  Seal,
  /**铅笔 */
  Pencil,
  /**评论 */
  Remark,
  /**表扬 */
  Praise,

  // 批改
  /**对 */
  Right,
  /**错 */
  Wrong,
  /**未完成 */
  NotCompleteRight,

  // 图片编辑
  /**放大/缩小 */
  Zoom,
  /**旋转 */
  Rotate,
  /**镜像水平翻转 */
  Flip,
  /**清理 */
  Clean,
  /**撤销 */
  Undo,
}
/**
 * 缩放类型
 */
enum Zoom {
  In = 1,
  Out,
}

/**
 * 舞台上元素的图标
 */
enum IconsInCanvas {
  /**加油 */
  EncourageOfSeal = 1,
  /**优秀 */
  ExcellentOfSeal,
  /**完美 */
  PerfectOfSeal,
  /**待批改 */
  UncorrectOfSeal,
  /**你真棒 */
  GreatOfSeal,
  /**半错 */
  NotCompleteRight,
  /**正确 */
  Right,
  /**错误 */
  Wrong,
  /**表扬 */
  Praise,
}

/**
 * 印章参数
 */
type SealParamsOfActionType = {
  /**印章类型 */
  insertIconType: number
  /**添加的点 */
  pointer: { x: number; y: number }
}
/**
 * 缩放的参数
 */
type ZoomParamsOfActionType = {
  /**缩放类型 */
  type: number
}
/**
 * 评论工具的参数
 */
type RemarkParamsOfActionType = {
  /**缩放类型 */
  text: number
  /**添加的点 */
  pointer: { x: number; y: number }
}

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
  params?:
    | SealParamsOfActionType
    | ZoomParamsOfActionType
    | RemarkParamsOfActionType
    | null

  /**需要拓展到舞台对象上的参数 */
  externalParams: Record<string | number, any>
}

/**图标配置 */
type IconConfig = {
  scaleX: number
  scaleY: number
}

export type {
  ICorrectTool,
  ActionTypeInfo,
  SealParamsOfActionType,
  ZoomParamsOfActionType,
  RemarkParamsOfActionType,
  IconConfig,
}
export { Controls, IconsInCanvas, Zoom }
