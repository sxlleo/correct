/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-17 14:31:15
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-06-28 16:35:42
 * @FilePath: /jzx-correct-mobile/src/interface/IAction.ts
 * @Description: 工具接口
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import type { fabric } from 'fabric'
interface IAction {
  /**
   * 触发的参数
   */
  triggerParams: any
  /**
   * 是否保持
   */
  isKeep: boolean
  /**
   * 其他额外的参数
   */
  externalParams: Record<string | number, any>
  /**
   *  鼠标按下
   * @param pointer
   */
  mousedown?(pointer: fabric.Point): void
  /**
   * 鼠标移动
   * @param pointer
   */
  mousemove?(pointer: fabric.Point): void
  /**
   * 鼠标抬起
   * @param pointer
   */
  mouseup?(pointer: fabric.Point): void
  /**
   * 重置
   */
  reset(): void
  /**
   * 销毁
   */
  destroy(): void
  /**
   * 禁用
   * @param value 是否禁用
   */
  disable?(value: boolean): void
}

type CopyCanvasData = {
  // 画布数据
  jsonData: any
  // 拷贝的画布宽度
  canvasWidth: number
}

type ToolParamConfig = {
  /**
   * 批改工具id
   */
  // correctId?: string
  /**
   * 图片地址
   */
  imageUrl: string
  /**
   * 存放canvas的容器，
   */
  container: HTMLElement

  /** 复制的画布数据*/
  copyCanvasData: CopyCanvasData
}

export type { IAction, ToolParamConfig, CopyCanvasData }
