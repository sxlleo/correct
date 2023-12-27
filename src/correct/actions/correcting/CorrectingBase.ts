/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-04-04 15:49:31
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-06 16:44:19
 * @FilePath: /correct-mobile/src/correct/actions/correcting/CorrectingBase.ts
 * @Description: 将组件共性的部分抽离出来，作为基类
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */
import type { fabric } from 'fabric'
import ActionBase from '../ActionBase'
import type CanvasWithImage from '@/correct/CanvasWithImage'

class CorrectingBase extends ActionBase {
  /**
   * 加载完成的图标
   */
  _loadedIcon: fabric.Image | Promise<any>

  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep = true,
    config?: any
  ) {
    super(correctId, type, canvas, isKeep, config)
  }

  /**
   * 复制图片回调
   * @param pointer 创建的图片的位置
   * @param img 图片实例对象
   */
  _onClone(pointer: fabric.Point, img: fabric.Image): void {
    img.set({
      top: pointer.y,
      left: pointer.x,
      originX: 'center',
      originY: 'center',
      ...this._config,
    })

    this.addListener(img)
    this.canvas.add(img)
    this.canvas.requestRenderAll()
  }

  mousedown(pointer: fabric.Point) {
    // 复制图片
    if (this._loadedIcon instanceof Promise) {
      this._loadedIcon.then((res) => {
        res.clone(this._onClone.bind(this, pointer))
      })
    } else {
      this._loadedIcon.clone(this._onClone.bind(this, pointer))
    }
  }

  destroy(): void {
    super.destroy()
    this._loadedIcon = null
  }
}

export default CorrectingBase
