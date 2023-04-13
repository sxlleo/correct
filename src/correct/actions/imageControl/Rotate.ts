import ActionBase from '../ActionBase'
import type CanvasWithImage from '../../CanvasWithImage'

export default class Rotate extends ActionBase {
  _config: any
  /**
   * 旋转步长
   */
  ROTATE_STEP = 90
  /**
   * 当前旋转角度
   */
  _curRotate = 0

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas, false)
    this._config = config
    console.log('@@@@@@rotate constructor===')
  }

  // override
  _handleOn(): void {
    console.log('handleOn')
    this._rotate()
  }

  /**
   * 放大
   */
  _rotate(): void {
    this._curRotate = this._curRotate + this.ROTATE_STEP === 360 ? 0 : this._curRotate + this.ROTATE_STEP
    this.canvas.updateBackgroundImageRotate(this._curRotate)
  }

  reset(): void {
    //
  }
}
