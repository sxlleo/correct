import type CanvasWithImage from '@/correct/CanvasWithImage'
import { iconsLoaded } from '@/util/index'

import { IconsInCanvas } from '@/interface/ICorrectTool'
import CorrectingBase from './CorrectingBase'

export default class Right extends CorrectingBase {
  _config: any
  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas)

    this._config = config
    // 加载完成的图标
    this._loadedIcon = iconsLoaded[IconsInCanvas.Right]
  }

  reset(): void {
    //
  }
}
