/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-02-02 15:29:38
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-06-21 11:25:38
 * @FilePath: /jzx-correct-mobile/src/correct/actions/imageControl/Zoom.ts
 * @Description: 放大缩小控制
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import type CanvasWithImage from '../../CanvasWithImage'
import ActionBase from '../ActionBase'

import { Zoom as ZoomSelect } from '@/interface/ICorrectTool'

export default class Zoom extends ActionBase {
  // 最大缩小
  OUT_MAX = 1
  // 操作的步长
  ZOOM_STEP = 0.1

  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = false,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
  }

  // override
  _handleOn(): void {
    switch (this._triggerParams.type) {
      case ZoomSelect.In:
        this._zoomIn()
        break
      case ZoomSelect.Out:
        this._zoomOut()
        break
    }
  }

  /**
   * 放大
   */
  _zoomIn(): void {
    const canvasZoom = this.canvas.getZoom()
    const newZoom = canvasZoom + this.ZOOM_STEP
    this.canvas.setZoom(newZoom)
  }

  /**
   * 缩小
   */
  _zoomOut(): void {
    const canvasZoom = this.canvas.getZoom()
    let newZoom: number

    if (canvasZoom - this.ZOOM_STEP >= this.OUT_MAX) {
      newZoom = canvasZoom - this.ZOOM_STEP
      this.canvas.setZoom(newZoom)
    }
  }

  reset(): void {
    //
  }
}
