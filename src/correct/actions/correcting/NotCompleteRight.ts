/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-01-29 14:17:27
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-04-04 15:57:19
 * @FilePath: /jzx-correct/src/correct/actions/correcting/NotCompleteRight.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */
import type CanvasWithImage from '../../CanvasWithImage'
import { iconsLoaded } from '@/util/index'
import { IconsInCanvas } from '@/interface/ICorrectTool'
import CorrectingBase from './CorrectingBase'
export default class NotCompleteRight extends CorrectingBase {
  _config: any

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas)

    this._config = config
    // 加载完成的图标
    this._loadedIcon = iconsLoaded[IconsInCanvas.NotCompleteRight]
  }

  reset(): void {
    //
  }
}
