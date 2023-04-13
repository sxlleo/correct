import { fabric } from 'fabric'
import type CanvasWithImage from '../../CanvasWithImage'
import ActionBase from '../ActionBase'

import '../../../util/ITextPatch'

class Text extends ActionBase {
  _config: any
  _curText: any

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas)
    this._config = config
  }

  _create(param: any): void {
    const text = new fabric.Textbox('', {
      editable: true,
      fontSize: 16,
      originY: 'center',
      fill: 'red',
      padding: 10,
      // @ts-ignore
      hiddenTextareaContainer: this.canvas.wrapperEl,
      ...param,
      ...this._config
    })

    text.__actionType = this._type

    this.addListener(text)

    this.canvas.add(text)
    this.canvas.setActiveObject(text)
    text.enterEditing()
    this._curText = text
  }

  mousedown(pointer: fabric.Point): void {
    console.log('mousedown', this)
    if (!this.isOn) return
    if (this._curText) {
      this._curText = null
    } else {
      this._create({
        top: pointer.y,
        left: pointer.x
      })
    }
  }

  reset(): void {
    //
  }
}

export default Text
