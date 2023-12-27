/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-29 14:17:27
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-06-16 16:32:50
 * @FilePath: /correct-mobile/src/correct/actions/correcting/NotCompleteRight.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import type CanvasWithImage from '../../CanvasWithImage'
import { iconsLoaded } from '@/util/index'
import { IconsInCanvas } from '@/interface/ICorrectTool'
import CorrectingBase from './CorrectingBase'
export default class NotCompleteRight extends CorrectingBase {
  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = true,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
    // 加载完成的图标
    this._loadedIcon = iconsLoaded[IconsInCanvas.NotCompleteRight]
  }

  reset(): void {
    //
  }
}
