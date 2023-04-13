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
  container: HTMLElement
}

export type { IAction, ToolParamConfig }
