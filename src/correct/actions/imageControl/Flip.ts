/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-02-02 14:35:49
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-06-16 16:34:10
 * @FilePath: /jzx-correct-mobile/src/correct/actions/imageControl/Flip.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import ActionBase from '../ActionBase'
import type CanvasWithImage from '../../CanvasWithImage'

export default class Flip extends ActionBase {
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
    console.log('handleOn')
    this._Flip()
  }

  /**
   * 镜像
   */
  _Flip(): void {
    this.canvas.updateBackgroundImageFlip()
  }

  reset(): void {
    //
  }
}
