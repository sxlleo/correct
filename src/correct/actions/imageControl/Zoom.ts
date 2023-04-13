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
