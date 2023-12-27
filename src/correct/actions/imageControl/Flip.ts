/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-02-02 14:35:49
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-06-16 16:34:10
 * @FilePath: /correct-mobile/src/correct/actions/imageControl/Flip.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
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
