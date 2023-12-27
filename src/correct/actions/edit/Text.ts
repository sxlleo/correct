/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-29 11:52:23
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-13 15:01:28
 * @FilePath: /correct-mobile/src/correct/actions/edit/Text.ts
 * @Description: 文本
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import { fabric } from 'fabric'

import type CanvasWithImage from '../../CanvasWithImage'
import ActionBase from '../ActionBase'

import '@/util/ITextPatch'

import eventBus from '@/util/EventBus'
import DefinedEvents from '../../DefinedEvents'
class Text extends ActionBase {
  /**
   * 默认字体大小
   */
  defaultFontSize = 32

  _curText: any

  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = true,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
  }

  _create(param: any): void {
    const fontSize = this.defaultFontSize * (this._config?.scaleX || 1)
    const text = new fabric.Textbox('', {
      editable: true,
      editingBorderColor: '#3262FD',
      fontSize,
      originY: 'center',
      fill: 'red',
      padding: 10,
      ...param,
    })

    this.addListener(text)

    this.canvas.add(text)
    this.canvas.setActiveObject(text)
    text.enterEditing()
    this._curText = text

    console.log('insert icon to canvas')
  }

  mousedown(pointer: fabric.Point): void {
    console.log('mousedown', this._curText)
    if (!this.isOn) return
    if (this._curText) {
      this._curText = null
    } else {
      this._create({
        top: pointer.y,
        left: pointer.x,
      })
    }
  }

  // override
  addListener(text: fabric.Object): void {
    super.addListener(text)

    text.on('editing:entered', () => {
      eventBus.emit(`${this.correctId}:${DefinedEvents.EDITING_ENTERED}`)
    })
    text.on('editing:exited', () => {
      eventBus.emit(`${this.correctId}:${DefinedEvents.EDITING_EXITED}`)
    })
  }

  reset(): void {
    //
  }

  // override
  destroy(): void {
    super.destroy()
    this._curText = null
  }
}

export default Text
