/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-06-14 14:34:16
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-08-02 16:45:22
 * @FilePath: /jzx-correct-mobile/src/correct/actions/edit/Pencil.ts
 * @Description:
 */
import ActionBase from '../ActionBase'
import type CanvasWithImage from '../../CanvasWithImage'

export default class Pencil extends ActionBase {
  /**
   * 批改工具被禁用，批改工具被禁用的话，画笔无法操作
   */
  private isDisabled = false

  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = true,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
    this._initializeBrush()
  }

  /** 初始化画笔信息 */
  _initializeBrush(): void {
    const brush = this.canvas.freeDrawingBrush
    brush.color = 'red'
    brush.width = 3
    // 侦听画笔创建
    this.canvas.on('path:created', this._onCreated.bind(this))
  }

  _onCreated(e: any): void {
    // @ts-ignore
    this.addListener(e.path, true)
  }

  // override
  _handleOn(): void {
    super._handleOn()
    this.canvas.isDrawingMode = !this.isDisabled
  }

  // override
  _handleOff(): void {
    super._handleOff()
    this.canvas.isDrawingMode = false
  }

  /**
   * 禁用
   * @param value 是否禁用
   */
  disable(value: boolean): void {
    this.isDisabled = value
    if (value) {
      this.canvas.isDrawingMode = false
    } else {
      if (this.isOn) {
        this.canvas.isDrawingMode = true
      } else {
        this.canvas.isDrawingMode = false
      }
    }
  }

  reset(): void {
    //
  }

  // override
  destroy(): void {
    super.destroy()
    this.canvas.off('path:created', this._onCreated)
  }
}
