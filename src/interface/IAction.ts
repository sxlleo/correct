/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-01-17 14:31:15
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-07-25 16:31:29
 * @FilePath: /jzx-correct/src/interface/IAction.ts
 * @Description: 工具接口
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */

import type { fabric } from 'fabric'
interface IAction {
  /**
   * 是否保持
   */
  isKeep: boolean
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
  container: HTMLElement,
  /**
   * 初始容器宽高
   */
  originalContainerWidth: number,
  originalContainerHeight: number,
}

export type { IAction, ToolParamConfig }
