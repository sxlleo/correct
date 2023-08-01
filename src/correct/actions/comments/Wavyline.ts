/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-29 14:15:12
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-02-27 16:12:02
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/core/correct/actions/comments/Wavyline.ts
 * @Description: 波浪线
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import { fabric } from 'fabric'
import type CanvasWithImage from '../../CanvasWithImage'
import ActionBase from '../ActionBase'

type WavylineConfigType = {
  // 波浪线的上下波动幅度
  rang?: number
  // 线宽度
  strokeWidth?: number
  // 最小周期的宽度（类似于函数周期）
  minPeriod?: number
}

/**
 * 默认配置
 */
const DefaultConfig: WavylineConfigType = {
  rang: 4,
  strokeWidth: 2,
  minPeriod: 20
}

class Wavyline extends ActionBase {
  _config: any
  _curLine: fabric.Path
  /**
   * 鼠标按下点
   */
  _downPointer: fabric.Point

  constructor(correctId: string, type: number, canvas: CanvasWithImage, config?: WavylineConfigType) {
    super(correctId, type, canvas)
    this._config = {
      ...DefaultConfig,
      ...config
    }
  }

  mousedown(pointer: fabric.Point): void {
    console.log('ison', this.isOn)
    if (!this.isOn) return
    // 记录初试位置
    this._downPointer = pointer

    // 设置canvas不能选中
    this.canvas.selection = false
    // 忽略canvas目标选中
    this.canvas.skipTargetFind = true
  }

  mousemove(pointer: fabric.Point): void {
    if (!this.isOn || !this._downPointer) return
    // 如果点重合了，则不进行绘制
    if (this._downPointer.eq(pointer)) return

    this._curLine && this.canvas.remove(this._curLine)
    this._draw(pointer)
    // 刷新一下画布
    this.canvas.requestRenderAll()
  }

  mouseup(pointer: fabric.Point): void {
    if (!this.isOn || !this._downPointer) return

    // 需要判断点击时和松开时鼠标的坐标点是否相等，相等的话就不创建椭圆了
    if (this._downPointer.eq(pointer)) {
      this._curLine && this.canvas.remove(this._curLine)
    } else {
      // 设置椭圆样式
      this._curLine.set('opacity', 1)
      this.canvas.setActiveObject(this._curLine)
    }

    // 恢复canvas选中逻辑
    this.canvas.selection = true
    this.canvas.skipTargetFind = false

    this.canvas.requestRenderAll()

    // 清除临时创建的椭圆
    this._curLine = null
    this._downPointer = null
  }

  // 利用贝塞尔曲线： 贝塞尔曲线 https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
  _draw(pointer: fabric.Point): void {
    const { period, num } = this._caculatePeriodAndNumByDistance(this._downPointer, pointer)

    let pathData = `M ${this._downPointer.x} ${this._downPointer.y}`
    for (let i = 0; i < num; i++) {
      // 计算基准的点
      const baseStartPointerX = this._downPointer.x + i * period
      if (i == 0) {
        pathData += ` C ${baseStartPointerX + period / 8} ${this._downPointer.y + this._config.rang}, ${baseStartPointerX + (period * 3) / 8} ${
          this._downPointer.y + this._config.rang
        }, ${baseStartPointerX + period / 2} ${this._downPointer.y}`
      } else {
        pathData += ` S ${baseStartPointerX + (period * 3) / 8} ${this._downPointer.y + this._config.rang}, ${baseStartPointerX + period / 2} ${
          this._downPointer.y
        }`
      }
      pathData += ` S ${baseStartPointerX + (period * 7) / 8} ${this._downPointer.y - this._config.rang}, ${baseStartPointerX + period} ${this._downPointer.y}`
    }

    // 计算弧度
    const cPointer = new fabric.Point(this._downPointer.x + 10, this._downPointer.y)
    // fabric Api和@types/fabric里面的接口定义对不上，囧！！！！（先忽略这个错误）
    const { angle } = fabric.util.getBisector(this._downPointer, cPointer, pointer)

    // TODO: 不清楚为什么算出来的角度都是下面两个半区，还需要研究下；暂时先判断点的y坐标来做反转
    const lineAngle = fabric.util.radiansToDegrees(angle)
    this._curLine = this._create(pathData, this._downPointer.y < pointer.y ? lineAngle : -lineAngle)
  }

  // 根据长度动态计算波浪线周期和周期个数
  _caculatePeriodAndNumByDistance(startPoint: fabric.Point, endPoint: fabric.Point): any {
    // 总距离
    const distance = startPoint.distanceFrom(endPoint)
    let period = this._config.minPeriod
    // 计算有几个周期
    let num = Math.floor(distance / period)

    // 如果有不能整除，则重新计算周期和周期个数
    if (distance % this._config.minPeriod !== 0) {
      num++
      period = distance / num
    }

    return {
      period,
      num
    }
  }

  _create(pathData: string, angle: number): fabric.Path {
    const line = new fabric.Path(pathData, {
      fill: 'transparent',
      stroke: 'red',
      originX: 'left',
      originY: 'center',
      strokeWidth: this._config.strokeWidth,
      angle: angle
    })

    line.__actionType = this._type
    this.addListener(line)

    // 添加到画布中
    this.canvas.add(line)
    return line
  }

  reset(): void {
    //
  }
}

export default Wavyline
export { type WavylineConfigType }
