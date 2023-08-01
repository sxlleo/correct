/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-01-29 11:52:23
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-07-26 10:25:25
 * @FilePath: /jzx-correct/src/correct/actions/comments/Text.ts
 * @Description: 文本
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */
import { fabric } from 'fabric'
import type CanvasWithImage from '../../CanvasWithImage'
import ActionBase from '../ActionBase'
class Text extends ActionBase {
  _config: any
  _curText: any

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: any) {
    super(correctId, type, canvas)
    this._config = config
  }

  _create(param: any): void {
    const { isFullscreen } = this.canvas
    
    const text = new fabric.IText('', {
      editable: true,
      fontSize: 16,
      originY: 'center',
      fill: 'red',
      padding: 10,
      // @ts-ignore
      hiddenTextareaContainer: isFullscreen ? this.canvas.wrapperEl.parentNode : null,
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

  // override
  _handleOff(): void {
    super._handleOff()
    this._curText && this._checkAndRemoveEmptyText()
    this._curText = null
  }

  mousedown(pointer: fabric.Point): void {
    console.log('mousedown', this)
    if (!this.isOn) return
    if (this._curText) {
      this._checkAndRemoveEmptyText()
      this._curText = null
    } else {
      this._create({
        top: pointer.y,
        left: pointer.x
      })
    }
  }

  _checkAndRemoveEmptyText(): void {
    if (!this._curText) return
    if(this._curText.text.length === 0) {
      this.canvas.remove(this._curText)
    }
  }

  reset(): void {
    //
  }
}

export default Text
