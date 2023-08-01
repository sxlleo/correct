/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-29 14:17:12
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-04-06 11:26:58
 * @FilePath: /jzx-correct/src/correct/actions/correcting/Wrong.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import type CanvasWithImage from '../../CanvasWithImage'
import { iconsLoaded } from '@/util/index'
import { IconsInCanvas } from '@/interface/ICorrectTool'

import CorrectingBase from './CorrectingBase'

export default class Wrong extends CorrectingBase {
  _config: any
  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas)
    this._config = config
    // 加载完成的图标
    this._loadedIcon = iconsLoaded[IconsInCanvas.Wrong]
  }

  reset(): void {
    //
  }
}
