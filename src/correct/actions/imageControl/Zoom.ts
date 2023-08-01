/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-02-02 15:29:38
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-02-27 16:11:45
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/core/correct/actions/imageControl/Zoom.ts
 * @Description: 放大缩小控制
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */
import type CanvasWithImage from '../../CanvasWithImage'
import ActionBase from '../ActionBase'

import { Zoom as ZoomSelect } from '../../../interface/ICorrectTool'

export default class Zoom extends ActionBase {
  _config: any

  // 最大缩小
  OUT_MAX = 1
  // 操作的步长
  ZOOM_STEP = 0.1

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas, false)
    this._config = config
  }

  // override
  _handleOn(): void {
    switch (this.triggerParams.type) {
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
