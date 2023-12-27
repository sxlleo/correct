/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-29 14:17:02
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-07-06 16:35:13
 * @FilePath: /jzx-correct-mobile/src/correct/actions/correcting/Right.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import type CanvasWithImage from '@/correct/CanvasWithImage'
import { iconsLoaded } from '@/util/index'

import { IconsInCanvas } from '@/interface/ICorrectTool'
import CorrectingBase from './CorrectingBase'

export default class Right extends CorrectingBase {
  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = true,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
    // 加载完成的图标
    this._loadedIcon = iconsLoaded[IconsInCanvas.Right]
  }

  reset(): void {
    //
  }
}
