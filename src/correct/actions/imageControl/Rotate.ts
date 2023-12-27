/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-02-02 14:35:49
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-06-16 16:34:17
 * @FilePath: /correct-mobile/src/correct/actions/imageControl/Rotate.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import ActionBase from '../ActionBase'
import type CanvasWithImage from '../../CanvasWithImage'

export default class Rotate extends ActionBase {
  /**
   * 旋转步长
   */
  ROTATE_STEP = 90
  /**
   * 当前旋转角度
   */
  _curRotate = 0

  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = false,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
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
    this._curRotate =
      this._curRotate + this.ROTATE_STEP === 360
        ? 0
        : this._curRotate + this.ROTATE_STEP
    this.canvas.updateBackgroundImageRotate(this._curRotate)
  }

  reset(): void {
    //
  }
}
