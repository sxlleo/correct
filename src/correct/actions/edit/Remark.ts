/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-29 11:52:23
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-13 15:01:32
 * @FilePath: /correct-mobile/src/correct/actions/edit/Remark.ts
 * @Description: 评论
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import { fabric } from 'fabric'

import type CanvasWithImage from '../../CanvasWithImage'
import ActionBase from '../ActionBase'

import '@/util/ITextPatch'

import eventBus from '@/util/EventBus'
import DefinedEvents from '../../DefinedEvents'

class Remark extends ActionBase {
  /**
   * 默认字体大小
   */
  defaultFontSize = 32
  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = true,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
  }

  _handleOn(): void {
    if (this.isKeep) {
      super._handleOn()
    } else {
      this._create()
    }
  }

  mousedown(pointer: fabric.Point): void {
    if (!this.isOn) return
    this._create(pointer)
  }

  _create(pointer?: any): void {
    const tempPointer = pointer || this._triggerParams.pointer

    const scale = this._config?.scaleX || 1
    const fontSize =
      (this._triggerParams.fontSize || this.defaultFontSize) * scale

    const text = new fabric.Textbox('', {
      editable: true,
      fontSize,
      originY: 'center',
      fill: 'red',
      padding: 10,
      text: this._triggerParams.text,
    })

    // this._triggerParams = { top: 40, right: 0 }
    let position: any = {}
    if (tempPointer) {
      position = {
        top: tempPointer.y,
        left: tempPointer.x,
      }
    } else {
      if (Object.hasOwnProperty.call(this._triggerParams, 'top')) {
        position.top = this._triggerParams.top + text.height / 2
      }
      if (Object.hasOwnProperty.call(this._triggerParams, 'left')) {
        position.left = this._triggerParams.left + text.width
      }
      if (Object.hasOwnProperty.call(this._triggerParams, 'right')) {
        position.left =
          this.canvas.width - this._triggerParams.right - text.width
      }
      if (Object.hasOwnProperty.call(this._triggerParams, 'bottom')) {
        position.top =
          this.canvas.height - this._triggerParams.bottom - text.height / 2
      }
    }

    console.log(
      '@@@@@@position',
      this._triggerParams,
      position,
      this.canvas.width,
      text.width
    )
    text.set(position)

    // const text = new fabric.Textbox('', {
    //   editable: true,
    //   fontSize,
    //   originY: 'center',
    //   fill: 'red',
    //   padding: 10,
    //   text: this._triggerParams.text,
    //   ...position,
    // })

    this.addListener(text)
    this.canvas.add(text)
    this.canvas.requestRenderAll()
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
}

export default Remark
