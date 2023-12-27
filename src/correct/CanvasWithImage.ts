/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-29 18:59:47
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-07-18 14:19:39
 * @FilePath: /jzx-correct-mobile/src/correct/CanvasWithImage.ts
 * @Description: 基础类，初始化canvas
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
import { fabric } from 'fabric'
import type { ToolParamConfig, CopyCanvasData } from '@/interface/IAction'
import { loadImage } from '../util/index'
import ResizeObserver from 'resize-observer-polyfill'
import { debounce } from 'lodash-es'

import DefinedEvents from './DefinedEvents'

//加载动画
const loadingIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAyMCI+CiAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgc3Ryb2tlPSIjMzI2MkZEIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjI2IDE0Ij4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgYXR0cmlidXRlVHlwZT0iWE1MIiB0eXBlPSJyb3RhdGUiIGR1cj0iMXMiIGZyb209IjAgMTAgMTAiIHRvPSIzNjAgMTAgMTAiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvY2lyY2xlPgogIDx0ZXh0IHg9IjI1IiB5PSIxMCIgZHk9Ii40ZW0iIHRleHQtYW5jaG9yPSJzdGFydCIgZm9udC1zaXplPSIxNnB4IiBmb250LXdlaWdodD0nYm9sZCc+5Yqg6L295LitPC90ZXh0Pgo8L3N2Zz4K'

class CanvasWithImage extends fabric.Canvas {
  /**
   * 背景图片
   */
  private _bgImageUrl: string
  /**
   * canvas的父节点
   */
  private _container: HTMLElement

  /**
   * 加载完成的图片
   */
  private _loadedBgImage: fabric.Image

  /**
   * 图片旋转角度
   */
  private _imgRotate = 0

  /**
   * 父容器当前的宽高
   */
  private _currentContainerWidth: number
  private _currentContainerHeight: number

  /**
   * 最小缩放比例
   */
  minZoomValue = 1

  /**
   * 是否水平翻转 默认false 不翻转
   */
  private _filpX = false

  /**
   * 批改工具id
   */
  private _correctId: string

  /**
   * 复制的canvas数据
   */
  private _copyCanvasData: CopyCanvasData

  /**
   * 尺寸调整观察
   */
  private _resizeObserver: ResizeObserver

  /**是否禁用 */
  isDisabled: boolean

  constructor(
    canvasEle: HTMLCanvasElement,
    options: any,
    correctId: string,
    config: ToolParamConfig
  ) {
    super(canvasEle, options)
    const { imageUrl, container, copyCanvasData } = config
    this._bgImageUrl = imageUrl
    this._container = container
    this._correctId = correctId
    this._copyCanvasData = copyCanvasData

    console.log('canvas with image constructor', imageUrl)

    // 初始化容器原始宽高
    this._currentContainerWidth = this._container.clientWidth
    this._currentContainerHeight = this._container.clientHeight

    // 更新canvas
    const containerResize = debounce(this._onContainerResize.bind(this), 100)

    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
          const {
            contentRect: { width, height },
          } = entry
          if (
            !(
              this._currentContainerWidth === width &&
              this._currentContainerHeight === height
            )
          ) {
            containerResize(width, height)
          }
        }
      })
    }

    this._initialize().then(() => {
      this._updateCanvasSize()
      if (this._copyCanvasData) {
        const { width } = this._caculateCanvasSize()
        const scale = width / this._copyCanvasData.canvasWidth
        this._updateObjectSizeInCanvas(scale)
      }
      this._updateBackgroundSize()
      // 发送加载完成事件
      this.fire(DefinedEvents.CANVAS_IMAGE_LOADED)

      this._resizeObserver?.observe(this._container)
    })
    console.log('canvas with image contructor1212')
  }

  private async _initialize(): Promise<any> {
    // 禁止全选功能
    this.selection = false
    // 设置背景图片
    const loadingImg = this._createLoadingEle()
    // 加载开始
    if (this._copyCanvasData) {
      await this._loadCopyCanvasData()
    } else {
      this._loadedBgImage = await loadImage(this._bgImageUrl)
      this.setBackgroundImage(this._loadedBgImage, this.renderAll.bind(this))
    }
    // 加载结束

    // 移除加载动画
    this._container.removeChild(loadingImg)
  }

  /**
   * 从复制canvas数据加载canvas
   * @returns
   */
  private _loadCopyCanvasData(): Promise<any> {
    console.log('_loadCopyCanvasData', this._copyCanvasData.jsonData)
    return new Promise((resolve, reject) => {
      this.loadFromJSON(this._copyCanvasData.jsonData, resolve)
    })
  }

  /**
   * 更新舞台上元素的位置和尺寸
   * @param scale 缩放比例
   */
  private _updateObjectSizeInCanvas(scale: number): void {
    this.getObjects().forEach((object) => {
      console.log('最后')
      // 更新舞台上的对象的大小
      const { top, left, scaleX, scaleY } = object

      object
        .set({
          top: top * scale,
          left: left * scale,
          scaleX: scaleX * scale,
          scaleY: scaleY * scale,
        })
        .setCoords()
    })
  }

  /**
   * 创建loading元素
   * @returns img元素
   */
  private _createLoadingEle(): HTMLElement {
    const imgEle = document.createElement('img')
    imgEle.src = loadingIcon
    imgEle.width = 120
    imgEle.height = 20
    imgEle.style.cssText =
      'position: absolute;top: 50%;left: 50%;margin-left: -60px;margin-top: -10px;'
    this._container.appendChild(imgEle)
    return imgEle
  }

  /**
   * 容器原始尺寸更新
   * @param width 容器宽度
   * @param height 容器高度
   */
  private _onContainerResize(width: number, height: number): void {
    // 设置当前容器尺寸
    this._currentContainerWidth = width
    this._currentContainerHeight = height

    // 更新舞台上的元素的尺寸
    const currentCanvasWidth = this.width
    const { width: canvasWidth } = this._caculateCanvasSize()
    const scale = canvasWidth / currentCanvasWidth
    this._updateObjectSizeInCanvas(scale)

    // 更新画布大小
    this._updateCanvasSize()
    // 更新背景图片大小
    this._updateBackgroundSize()

    console.log('======_onContainerResize')
  }

  /**
   * 更新背景图片角度
   * @param rotate 角度
   */
  async updateBackgroundImageRotate(rotate = 0): Promise<any> {
    this._imgRotate = rotate
    this._updateCanvasSize()

    if (this.getZoom() != this.minZoomValue) this.setZoom(this.minZoomValue)
    this._updateBackgroundSize()
  }

  /**
   * 镜像图片 使用fabric的flipX: true属性
   * @param
   */
  async updateBackgroundImageFlip(): Promise<any> {
    const flipX =
      typeof this._loadedBgImage === 'object'
        ? !!this._loadedBgImage.flipX
        : false
    this._filpX = !flipX
    this._updateBackgroundSize()
  }

  /**
   * 更新背景图片地址
   * @param imageUrl 图片地址
   */
  async updateBackgroundImage(
    imageUrl: string,
    finishCallback: () => void
  ): Promise<any> {
    this._bgImageUrl = imageUrl
    loadImage(imageUrl).then((img) => {
      // 因为会多次调用updateBackgroundImage方法，所以需要判断是否是同一张图片，以最后调用的为准
      if (imageUrl !== this._bgImageUrl) return

      this._loadedBgImage = img

      this.setBackgroundImage(this._loadedBgImage, () => {
        // 重置状态
        this._imgRotate = 0
        this._filpX = false
        this._updateBackgroundSize()
        this.renderAll()
        finishCallback?.()
      })
    })
  }

  /**
   * 根据图片原始尺寸，1:更新canvas大小；2:更新背景图片大小
   * @param param 设置图片的参数
   */
  private _updateBackgroundSize(): void {
    // 计算获取图片尺寸
    const { width: imgWidth, height: imgHeight } =
      this._calculateImageSizeByRotate()

    // console.log('==========canvasWidth', canvasWidth)
    // console.log('==========canvas当前尺寸', canvasWidth + (zoom - this.minZoomValue) * this._canvasOriginalWidth)
    // console.log('==========_canvasOriginalWidth', this._canvasOriginalWidth)
    // console.log('==========img size', imgWidth, imgHeight)
    // console.log('==========canvas相对于原始尺寸的比例', (canvasWidth * (1 + zoom - this.minZoomValue)) / this._canvasOriginalWidth)

    console.log('_updateBackgroundSize', this.width, this.height, this._filpX)
    this._loadedBgImage.set({
      top: this.height / 2,
      left: this.width / 2,
      scaleX: this.width / imgWidth,
      scaleY: this.height / imgHeight,
      originX: 'center',
      originY: 'center',
      flipX: this._filpX,
      angle: this._imgRotate,
    })

    this.requestRenderAll()
  }

  /**
   * 计算图片尺寸
   * @returns 图片尺寸和图片是否翻转
   */
  private _calculateImageSizeByRotate(): any {
    let imgWidth = this._loadedBgImage.width
    let imgHeight = this._loadedBgImage.height

    // const angle = this._loadedBgImage.get('angle')
    console.log('_calculateImageSizeByRotate', imgWidth, imgHeight)
    // 尺寸翻转
    const isRotateSize = (this._imgRotate / 90) % 2 !== 0

    console.log('isRotateSize', this._imgRotate, isRotateSize)

    if (isRotateSize) {
      const tempWidth = imgWidth
      imgWidth = imgHeight
      imgHeight = tempWidth
    }
    return {
      width: imgWidth,
      height: imgHeight,
    }
  }

  /**
   * 根据图片尺寸，计算canvas尺寸
   * @returns
   */
  private _caculateCanvasSize(): any {
    // 计算获取图片尺寸
    const { width: imgWidth, height: imgHeight } =
      this._calculateImageSizeByRotate()
    const imgRate: number = imgWidth / imgHeight

    let canvasHeight: number, canvasWidth: number
    const tempContainerWidth = this._currentContainerWidth
    const tempContainerHeight = this._currentContainerHeight
    const containerSizeRate = tempContainerWidth / tempContainerHeight
    if (imgRate > containerSizeRate) {
      canvasWidth = tempContainerWidth
      canvasHeight = tempContainerWidth / imgRate
    } else {
      canvasHeight = tempContainerHeight
      canvasWidth = imgRate * tempContainerHeight
    }
    return {
      width: canvasWidth,
      height: canvasHeight,
    }
  }

  /**
   * 更新图片尺寸
   */
  private _updateCanvasSize(): void {
    const { width, height } = this._caculateCanvasSize()
    console.log('更新画布大小', width, height)
    // 设置canvas大小
    this.setWidth(width)
    this.setHeight(height)
  }

  /**
   * 生成最后的批改图片
   * @returns
   */
  generateImage(): File {
    // 如果编辑过，才生成图片，否则不生成
    // if (this.getObjects().length === 0) return null

    const [scaleX, , , scaleY, translateX, translateY] = this.viewportTransform
    // let translateX = viewportTransform[4]
    // let translateY = viewportTransform[5]
    // const scaleX = viewportTransform[0]
    // const scaleY = viewportTransform[3]

    // TODO: 生成图片的尺寸可以考虑优化一下，全屏状态下或者放大状态下生成的图片会比较大；
    // 暂时的处理是如果图片较小，则放大2倍，默认1倍
    const canvasWidth = this.getWidth(),
      canvasHeight = this.getHeight(),
      multiplier = canvasWidth > 1000 ? 1 : 2

    const dataURL = this.toDataURL({
      format: 'jpeg',
      left: translateX,
      top: translateY,
      width: canvasWidth * scaleX,
      height: canvasHeight * scaleY,
      multiplier: multiplier / scaleY,
    })

    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    const file = new File([u8arr], this._correctId, { type: mime })
    return file
  }

  // override
  setZoom(value: number): fabric.Canvas {
    super.setZoom(value < this.minZoomValue ? this.minZoomValue : value)
    return this
  }

  // override
  zoomToPoint(point: fabric.Point, value: number): fabric.Canvas {
    value = value < this.minZoomValue ? this.minZoomValue : value

    // 计算点相对于container的坐标
    const { width, height, left, top } = this._container.getBoundingClientRect()
    const x = point.x - left
    const y = point.y - top

    // 计算相对于container的点相对于canvas的坐标
    const targetPoint = new fabric.Point(
      x - (width - this.width) / 2,
      y - (height - this.height) / 2
    )
    super.zoomToPoint(targetPoint, value)

    this.setViewportTransform(this.viewportTransform)
    return this
  }

  // override
  /**
   * 设置canvas的transform
   * @param viewportTransform
   * @returns
   * @description
   * 参考：
   * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setTransform
   * http://fabricjs.com/docs/fabric.js.html#line9423
   */
  setViewportTransform(viewportTransform: number[]): fabric.Canvas {
    super.setViewportTransform(
      this._correctViewportTransform(viewportTransform)
    )
    return this
  }

  /**
   * 校准背景图片位置，防止背景图片超出canvas
   * @param viewportTransform
   * @returns
   */
  private _correctViewportTransform(viewportTransform: number[]): number[] {
    // 校准背景图片，防止背景图片超出canvas
    // 左上角是0,0点, 0,0点右边和下边是正值，左边和上边是负值
    let translateX = viewportTransform[4]
    let translateY = viewportTransform[5]
    const scaleX = viewportTransform[0]
    const scaleY = viewportTransform[3]

    if (translateX > 0) {
      translateX = 0
    } else if (translateX < this.width - this.width * scaleX) {
      translateX = this.width - this.width * scaleX
    }

    if (translateY > 0) {
      translateY = 0
    } else if (translateY < this.height - this.height * scaleY) {
      translateY = this.height - this.height * scaleY
    }

    return [
      scaleX,
      viewportTransform[1],
      viewportTransform[2],
      scaleY,
      translateX,
      translateY,
    ]
  }

  // override
  loadFromJSON(json: any, callback?: any, reviver?: () => void): fabric.Canvas {
    // console.log('loadFromJSON', json)
    super.loadFromJSON(
      json,
      () => {
        const backgroundImage = this.backgroundImage
        this._loadedBgImage = backgroundImage as fabric.Image
        // console.log('loadFromJSON', backgroundImage)
        callback?.()
        this.renderAll()
      },
      reviver
    )
    return this
  }

  destroy(): void {
    this._resizeObserver.unobserve(this._container)
    this._resizeObserver = null
    console.log('canvas with image destroy')
  }

  /**
   * 获取背景图片
   */
  get bgImageUrl(): string {
    return this._bgImageUrl
  }
}

export default CanvasWithImage
