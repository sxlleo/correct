/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-01-29 18:59:47
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-07-25 16:39:08
 * @FilePath: /jzx-correct/src/correct/CanvasWithImage.ts
 * @Description: 基础类，初始化canvas
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */

import { fabric } from 'fabric'
import type { ToolParamConfig } from '../interface/IAction'
import { loadImage } from '../util/index'
import ResizeObserver from 'resize-observer-polyfill'

import { debounce } from 'lodash-es'

//加载动画
const loadingIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAyMCI+CiAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgc3Ryb2tlPSIjMzI2MkZEIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjI2IDE0Ij4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgYXR0cmlidXRlVHlwZT0iWE1MIiB0eXBlPSJyb3RhdGUiIGR1cj0iMXMiIGZyb209IjAgMTAgMTAiIHRvPSIzNjAgMTAgMTAiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvY2lyY2xlPgogIDx0ZXh0IHg9IjI1IiB5PSIxMCIgZHk9Ii40ZW0iIHRleHQtYW5jaG9yPSJzdGFydCIgZm9udC1zaXplPSIxNnB4IiBmb250LXdlaWdodD0nYm9sZCc+5Yqg6L295LitPC90ZXh0Pgo8L3N2Zz4K'

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
   * canvas原始宽高
   */
  private _canvasOriginalWidth: number
  private _canvasOriginalHeight: number

  /**
   * 父容器原始的宽高
   */
  private _originalContainerWidth: number
  private _originalContainerHeight: number

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
   * 背景图片尺寸
   */
  _bgImageRotate = 0

  /**
   * 是否水平翻转 默认false 不翻转
   */
  _filpX = false
  /**
   * 是否垂直翻转 默认false 不翻转
   */
  _filpY = false

  /**
   * 批改工具id
   */
  _correctId: string

  /**
   * 全屏
   */
  _isFullscreen: boolean = false

  private _resizeObserver: ResizeObserver

  constructor(canvasEle: HTMLCanvasElement, options: any, correctId: string, config: ToolParamConfig) {
    super(canvasEle, options)
    const { imageUrl, container, originalContainerWidth, originalContainerHeight } = config
    this._bgImageUrl = imageUrl
    this._container = container
    this._correctId = correctId

    // 初始化容器原始宽高
    this._originalContainerWidth = this._currentContainerWidth = originalContainerWidth
    this._originalContainerHeight = this._currentContainerHeight = originalContainerHeight

    // 更新canvas
    const containerResize = debounce(this._onContainerResize.bind(this), 100)

    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
          const { borderBoxSize, contentBoxSize, contentRect } = entry;
          const { inlineSize: width, blockSize: height } = borderBoxSize?.length > 0 ? borderBoxSize[0] : contentBoxSize?.length > 0 ? contentBoxSize[0] : 0
          let tempWidth = width === undefined ? contentRect.width : width;
          let tempHeight = height === undefined ? contentRect.height : height;
          if (!(this._currentContainerWidth === tempWidth && this._currentContainerHeight === tempHeight)) {
            containerResize(tempWidth, tempHeight);
          }
        }
      })
    }

    // 修复canvas父级容器布局有问题
    // @ts-ignore
    if(canvasEle.parentNode) canvasEle.parentNode.style.margin = 'auto 0'

    this._initialize().then(() => {
      this._resizeObserver?.observe(this._container)
    })

    console.log('canvas with image contructor')
  }

  async _initialize(): Promise<any> {
    // 禁止全选功能
    this.selection = false

    // 设置背景图片
    const loadingImg = this._createLoadingEle()
    this._loadedBgImage = await loadImage(this._bgImageUrl)
    this.backgroundImage = this._loadedBgImage
    this._container.removeChild(loadingImg)

    //
    this._initializeOriginalCanvasSize()
    //
    this._update()
  }

  /**
   * 创建loading元素
   * @returns img元素
   */
  _createLoadingEle(): HTMLElement {
    const imgEle = document.createElement('img')
    imgEle.src = loadingIcon
    imgEle.width = 120
    imgEle.height = 20
    imgEle.style.cssText = 'position: absolute;top: 50%;left: 50%;margin-left: -60px;margin-top: -10px;'
    this._container.appendChild(imgEle)
    return imgEle
  }

  /**
   * 初始化canvas原始尺寸
   */
  _initializeOriginalCanvasSize(): void {
    // 计算获取图片尺寸
    const { width: imgWidth, height: imgHeight } = this._calculateImageSizeByRotate()
    // 计算获取原始canvas的大小
    const { width: canvasWidth, height: canvasHeight } = this._calculateCanvasSizeByImageRate(
      imgWidth / imgHeight,
      this._originalContainerWidth,
      this._originalContainerHeight
    )

    this._canvasOriginalWidth = canvasWidth
    this._canvasOriginalHeight = canvasHeight

    const { width: curCanvasWidth } = this._calculateCanvasSizeByImageRate(imgWidth / imgHeight)

    this.minZoomValue = curCanvasWidth > canvasWidth ? curCanvasWidth / this._canvasOriginalWidth : 1
  }

  /**
   * 容器原始尺寸更新
   * @param width 容器宽度
   * @param height 容器高度
   */
  _onContainerResize(width: number, height: number): void {
    // 设置当前容器尺寸
    this._currentContainerWidth = width
    this._currentContainerHeight = height
    const originalCanvasWidth = this.getWidth()
    const originalCanvasHeight = this.getHeight()
    // 记录调整之前的zoom变化
    const changeZoom = this.getZoom() - this.minZoomValue

    const { width: canvasWidth } = this._calculateCanvasSizeByImageRate(originalCanvasWidth / originalCanvasHeight)

    this.minZoomValue = canvasWidth > this._canvasOriginalWidth ? canvasWidth / this._canvasOriginalWidth : 1
    this.setZoom(this.minZoomValue + changeZoom)
    // this.setZoom(this.minZoomValue)
  }

  /**
   * 更新背景图片角度
   * @param rotate 角度
   */
  async updateBackgroundImageRotate(rotate = 0): Promise<any> {
    this._bgImageRotate = rotate
    this._loadedBgImage.set({
      angle: rotate
    })
    this._initializeOriginalCanvasSize()
    if (this.getZoom() != this.minZoomValue) this.setZoom(this.minZoomValue)
    setTimeout(() => {
      this._update()
    }, 0)
  }

  /**
   * 镜像图片 使用fabric的flipX: true属性
   * @param
   */
  async updateBackgroundImageFlip(): Promise<any> {
    if (this._bgImageRotate === 90 || this._bgImageRotate === 270) { // 处理竖向图片时
      const flipY = typeof this.backgroundImage === 'object' ? !!this.backgroundImage.flipY : false
      this._filpY = !flipY
    } else {
      const flipX = typeof this.backgroundImage === 'object' ? !!this.backgroundImage.flipX : false
      this._filpX = !flipX
    }
    setTimeout(() => {
      this._update()
    }, 0)
  }

  /**
   * 更新背景图片地址
   * @param imageUrl 图片地址
   */
  async updateBackgroundImage(imageUrl: string): Promise<any> {
    this._bgImageUrl = imageUrl
    this._loadedBgImage = await loadImage(this._bgImageUrl)
    this.backgroundImage = this._loadedBgImage
    this._update()
  }

  /**
   * 根据图片原始尺寸，1:更新canvas大小；2:更新背景图片大小
   * @param param 设置图片的参数
   */
  _update(): void { 
    const zoom = this.getZoom()
    // 计算获取图片尺寸
    const { width: imgWidth, height: imgHeight } = this._calculateImageSizeByRotate()
    // 计算获取canvas的大小
    const { width: canvasWidth, height: canvasHeight } = this._calculateCanvasSizeByImageRate(imgWidth / imgHeight)

    // 设置canvas尺寸
    this.setWidth(canvasWidth + (zoom - this.minZoomValue) * this._canvasOriginalWidth)
    this.setHeight(canvasHeight + (zoom - this.minZoomValue) * this._canvasOriginalHeight)

    // console.log('==========@@@@@@@ min zoom value', this.minZoomValue)
    // console.log('==========canvas zoom value', zoom)
    // console.log('==========zoom step', zoom - this.minZoomValue)
    // console.log('==========canvasWidth', canvasWidth)
    // console.log('==========canvas当前尺寸', canvasWidth + (zoom - this.minZoomValue) * this._canvasOriginalWidth)
    // console.log('==========_canvasOriginalWidth', this._canvasOriginalWidth)
    // console.log('==========img size', imgWidth, imgHeight)
    // console.log('==========canvas相对于原始尺寸的比例', (canvasWidth * (1 + zoom - this.minZoomValue)) / this._canvasOriginalWidth)
    this._loadedBgImage.set({
      top: this._canvasOriginalHeight / 2,
      left: this._canvasOriginalWidth / 2,
      scaleX: this._canvasOriginalWidth / imgWidth,
      scaleY: this._canvasOriginalHeight / imgHeight,
      originX: 'center',
      originY: 'center',
      flipX: this._filpX,
      flipY: this._filpY
    })
  }

  /**
   * 计算图片尺寸
   * @returns 图片尺寸和图片是否翻转
   */
  _calculateImageSizeByRotate(): any {
    let imgWidth = this._loadedBgImage.width
    let imgHeight = this._loadedBgImage.height

    // 尺寸翻转
    const isRotateSize = (this._bgImageRotate / 90) % 2 !== 0

    if (isRotateSize) {
      const tempWidth = imgWidth
      imgWidth = imgHeight
      imgHeight = tempWidth
    }
    // console.log('_calculateImageSizeByRotate', imgWidth, imgHeight)

    return {
      width: imgWidth,
      height: imgHeight
    }
  }

  /**
   * 计算canvas尺寸
   * @param rate 图片宽高比
   * @param containerWidth 图片宽高比
   * @param containerHeight 图片宽高比
   * @returns
   */
  _calculateCanvasSizeByImageRate(rate: number, containerWidth?: number, containerHeight?: number): any {
    // console.log('_calculateCanvasSizeByImageRate,', containerWidth)
    // console.log('_calculateCanvasSizeByImageRate1,', this._currentContainerWidth)
    let canvasHeight: number, canvasWidth: number
    const tempContainerWidth = containerWidth || this._currentContainerWidth
    const tempContainerHeight = containerHeight || this._currentContainerHeight
    const containerSizeRate = tempContainerWidth / tempContainerHeight
    if (rate > containerSizeRate) {
      canvasWidth = tempContainerWidth
      canvasHeight = tempContainerWidth / rate
    } else {
      canvasHeight = tempContainerHeight
      canvasWidth = rate * tempContainerHeight
    }
    return {
      width: canvasWidth,
      height: canvasHeight
    }
  }

  /**
   * 生成最后的批改图片
   * @returns
   */
  generateImage(): File {
    // 如果编辑过，才生成图片，否则不生成
    if (this.getObjects().length === 0) return null

    // TODO: 生成图片的尺寸可以考虑优化一下，全屏状态下或者放大状态下生成的图片会比较大；
    // 暂时的处理事如果图片较小，则放大2倍，默认1倍
    const canvasWidth = this.getWidth(),
      canvasHeight = this.getHeight(),
      multiplier = canvasWidth > 1000 ? 1 : 2

    const dataURL = this.toDataURL({ format: 'jpeg', left: 0, top: 0, width: canvasWidth, height: canvasHeight, multiplier })
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
  setZoom(value: number) {
    super.setZoom(value < this.minZoomValue ? this.minZoomValue : value)
    // 需要更新宽度和高度，否则没有滚动条
    this._update()
    return this
  }

  resetFilpRotate(){
    // 重置翻转和旋转
    this._filpY = false
    this._filpX = false
    this._bgImageRotate = 0
    setTimeout(() => {
      this._update()
    }, 0)
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

  get canvasOriginalWidth(): number {
    return this._canvasOriginalWidth
  }

  get canvasOriginalHeight(): number {
    return this._canvasOriginalHeight
  }

  get originalContainerWidth(): number {
    return this._originalContainerWidth
  }

  get originalContainerHeight(): number {
    return this._originalContainerHeight
  }

  set isFullscreen(value: boolean) {
    this._isFullscreen = value
  }

  get isFullscreen(): boolean {
    return this._isFullscreen
  }
}

export default CanvasWithImage
