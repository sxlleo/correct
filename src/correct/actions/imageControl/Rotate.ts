/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-02-02 14:35:49
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-02-27 16:11:48
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/core/correct/actions/imageControl/Rotate.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
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
