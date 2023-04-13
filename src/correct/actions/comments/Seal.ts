import type { fabric } from 'fabric'
import ActionBase from '../ActionBase'
import { iconsLoaded } from '../../../util/index'
import type CanvasWithImage from '../../CanvasWithImage'

export default class Seal extends ActionBase {
  _config: any
  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas, false)
    this._config = config
  }

  _handleOn(): void {
    //
    this._createImage()
  }

  _createImage(): void {
    console.log('insert seal', this.triggerParams.insertIconType)
    // 复制一个image
    iconsLoaded[this.triggerParams.insertIconType].clone(this._onClone.bind(this))
  }

  _onClone(img: fabric.Image): void {
    const scale = 0.6
    const imgWidth = img.width * scale,
      imgHeight = img.height * scale

    img.set({
      top: 40 + imgHeight / 2,
      left: this.canvas.canvasOriginalWidth - 40 - imgWidth / 2,
      originX: 'center',
      originY: 'center',
      scaleX: scale,
      scaleY: scale,
      angle: -15
    })
    // 不显示的控制点
    img.setControlsVisibility({
      mb: false,
      mt: false,
      mr: false,
      ml: false
    })

    img.__actionType = this._type

    this.addListener(img)
    this.canvas.add(img)

    console.log('insert seal clone', this.canvas.getWidth(), this.canvas.getHeight())
  }

  reset(): void {
    //
  }
}
