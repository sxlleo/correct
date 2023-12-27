/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-29 14:16:25
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-06-28 15:05:10
 * @FilePath: /correct-mobile/src/correct/actions/edit/Seal.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import type { fabric } from 'fabric'
import ActionBase from '../ActionBase'
import { iconsLoaded } from '@/util/index'
import type CanvasWithImage from '../../CanvasWithImage'

export default class Seal extends ActionBase {
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
      this._createImage()
    }
  }

  _createImage(pointer?: fabric.Point): void {
    console.log('insert seal', this._triggerParams.insertIconType)
    const icon = iconsLoaded[this._triggerParams.insertIconType]
    // 复制一个image
    if (icon instanceof Promise) {
      icon.then((res) => {
        res.clone(this._onClone.bind(this, pointer))
      })
    } else {
      icon.clone(this._onClone.bind(this, pointer))
    }
  }

  mousedown(pointer: fabric.Point): void {
    if (!this.isOn) return
    this._createImage(pointer)
  }

  /**
   * 复制图片
   * @param pointer 插入图标位置
   * @param img 需要复制的图片
   */
  _onClone(pointer: fabric.Point, img: fabric.Image): void {
    const tempPointer = pointer || this._triggerParams.pointer

    const scale = 0.6 * (this._config?.scaleX || 1)
    const imgWidth = img.width * scale,
      imgHeight = img.height * scale

    let position: any = {}
    if (tempPointer) {
      position = {
        top: tempPointer.y,
        left: tempPointer.x,
      }
    } else {
      if (Object.hasOwnProperty.call(this._triggerParams, 'top')) {
        position.top = this._triggerParams.top + imgHeight / 2
      }
      if (Object.hasOwnProperty.call(this._triggerParams, 'left')) {
        position.left = this._triggerParams.left + imgWidth / 2
      }
      if (Object.hasOwnProperty.call(this._triggerParams, 'right')) {
        position.left =
          this.canvas.width - this._triggerParams.right - imgWidth / 2
      }
      if (Object.hasOwnProperty.call(this._triggerParams, 'bottom')) {
        position.top =
          this.canvas.height - this._triggerParams.bottom - imgHeight / 2
      }
    }

    img.set({
      originX: 'center',
      originY: 'center',
      scaleX: scale,
      scaleY: scale,
      angle: -15,
      ...position,
    })
    // 不显示的控制点
    img.setControlsVisibility({
      mb: false,
      mt: false,
      mr: false,
      ml: false,
    })

    this.addListener(img)
    this.canvas.add(img)

    this.canvas.renderAll()

    console.log('insert icon to canvas2')
  }

  reset(): void {
    //
  }
}
