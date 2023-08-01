/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-29 14:14:05
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-02-27 18:01:49
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/core/correct/actions/comments/Ellipse.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import { fabric } from 'fabric'
import type CanvasWithImage from '../../CanvasWithImage'

import ActionBase from '../ActionBase'

/**
 * 用户可以设置的配置类型
 */
type EllipseConfigType = {
  opacity?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
}

// 默认配置，具体其他参数参考官方文档（http://fabricjs.com/docs/fabric.Ellipse.html）
const DefaultConfig = {
  opacity: 0.5,
  fill: 'transparent',
  stroke: 'rgb(255, 0, 0)',
  strokeWidth: 2
}

class Ellipse extends ActionBase {
  _config: any
  _curEllipse: fabric.Ellipse
  _downPointer: fabric.Point

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: EllipseConfigType) {
    super(correctId, type, canvas)
    this._config = {
      ...DefaultConfig,
      ...config
    }
  }

  _create(param: any): fabric.Ellipse {
    const ellipse: fabric.Ellipse = new fabric.Ellipse({
      ...this._config,
      ...param
    })

    ellipse.__actionType = this._type
    this.addListener(ellipse)
    this.canvas.add(ellipse)
    return ellipse
  }

  mousedown(pointer: fabric.Point): void {
    if (!this.isOn) return
    // 记录初试位置
    this._downPointer = pointer

    this._curEllipse = this._create({
      top: pointer.y,
      left: pointer.x
    })

    console.log('first', this._curEllipse.controls.deleteControl)

    // 设置canvas不能选中
    this.canvas.selection = false
    // 忽略canvas目标选中
    this.canvas.skipTargetFind = true
  }

  mousemove(pointer: fabric.Point): void {
    if (!this.isOn || !this._curEllipse) return

    const rx = Math.abs(this._downPointer.x - pointer.x) / 2
    const ry = Math.abs(this._downPointer.y - pointer.y) / 2

    const top = pointer.y > this._downPointer.y ? this._downPointer.y : this._downPointer.y - ry * 2
    const left = pointer.x > this._downPointer.x ? this._downPointer.x : this._downPointer.x - rx * 2

    // 设置椭圆尺寸和所在位置
    this._curEllipse.set({
      rx: rx,
      ry: ry,
      top: top,
      left: left
    })
    // 刷新一下画布
    this.canvas.requestRenderAll()
  }

  mouseup(pointer: fabric.Point): void {
    if (!this.isOn || !this._curEllipse) return

    // 需要判断点击时和松开时鼠标的坐标点是否相等，相等的话就不创建椭圆了
    if (JSON.stringify(this._downPointer) === JSON.stringify(pointer)) {
      this.canvas.remove(this._curEllipse)
    } else {
      // 设置椭圆样式
      this._curEllipse.set('opacity', 1)
      this.canvas.setActiveObject(this._curEllipse)
    }

    // 恢复canvas选中逻辑
    this.canvas.selection = true
    this.canvas.skipTargetFind = false
    this.canvas.requestRenderAll()

    // 清除临时创建的椭圆
    this._curEllipse = null
  }

  reset(): void {
    //
  }
}

export default Ellipse
export { type EllipseConfigType }
