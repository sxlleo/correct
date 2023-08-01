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

export default class Flip extends ActionBase {
  _config: any

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas, false)
    this._config = config
    console.log('@@@@@@Filp constructor===')
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
