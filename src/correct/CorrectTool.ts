/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-12 14:56:43
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-19 11:42:58
 * @FilePath: /correct-mobile/src/correct/CorrectTool.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import type { ICorrectTool, ActionTypeInfo } from '@/interface/ICorrectTool'
import { Controls, type IconConfig } from '@/interface/ICorrectTool'

import type { ToolParamConfig } from '@/interface/IAction'
import ActionsManager from './ActionsManager'
import CanvasWithImage from './CanvasWithImage'

import DefinedEvents from './DefinedEvents'
import eventBus from '@/util/EventBus'
import EventMitter from '@/util/EventEmitter'

import Hammer from 'hammerjs'
import { v4 } from 'uuid'
import { fabric } from 'fabric'

// 创建删除图标

class CorrectTool extends EventMitter implements ICorrectTool {
  // @ts-ignore
  static VERSION = '__VERSION__'
  // canvas实例
  canvas: CanvasWithImage
  // 批改工具容器
  private _container: HTMLElement

  /** 触摸层 */
  private _touchWrapper: HTMLElement

  private _toolManager: ActionsManager

  private _correctId: string = v4()

  private _isDisabled = false

  private _prePanX = 0
  private _prePanY = 0
  private _preScale = 1
  private _hammerManager: Hammer.Manager

  private _curPinchActiveObject: any

  _options: any = {}

  constructor(config: ToolParamConfig, options?: any) {
    super()
    const { container } = config
    this._container = container
    this._options = options || {}

    this._initializeCanvas(config)
    this._addObjectListener()
    this._initializeTouchEvents()

    this._toolManager = new ActionsManager(this._correctId, this.canvas)

    console.log('mobile correct tool constructor')
  }

  /**
   * 初始化canvas
   * @param config
   */
  private _initializeCanvas(config: ToolParamConfig): void {
    // 创建fabric canvas实例
    const canvasEle = this._createCanvasEle(this._container)
    this.canvas = new CanvasWithImage(
      canvasEle,
      {
        // 用于控制对象的堆叠顺序。
        preserveObjectStacking: true,
        isDrawingMode: false,
        backgroundColor: '#f2f7fe',
        ...this._options,
      },
      this._correctId,
      config
    )
  }

  /**
   * 初始化触摸事件
   */
  private _initializeTouchEvents(): void {
    // create a manager for that element
    this._hammerManager = new Hammer.Manager(this._touchWrapper)

    // create a recognizer
    const Pinch = new Hammer.Pinch()
    const Pan = new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: 2,
    })
    const Doubletap = new Hammer.Tap({ event: 'doubletap', taps: 2 })
    const Tap = new Hammer.Tap()

    // add the recognizer
    this._hammerManager.add([Pinch, Pan, Doubletap, Tap])

    // subscribe to events
    this._hammerManager.on('pinchstart', this._onPinchStart.bind(this))
    this._hammerManager.on('panstart', this._onPanStart.bind(this))
    this._hammerManager.on('doubletap', this._onDoubleTap.bind(this))
    this._hammerManager.on('tap', this._onTap.bind(this))
  }

  /**
   * 单指开始
   * @param e 事件对象
   * @returns
   */
  private _onPanStart(e: any): void {
    console.log('=========_onPanStart', this._toolManager.curActionType, e)
    this._hammerManager.on('panmove', this._onPanMoveHandle.bind(this))
    this._hammerManager.on('panend', this._onPanEndHandle.bind(this))

    if (
      this._toolManager.curActionType === Controls.Pencil &&
      !this._isDisabled
    ) {
      // 如果是画笔，则不处理
      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pan',
      })
    } else if (this.canvas.getActiveObject() && !this._isDisabled) {
      // 如果当前有正在活跃的action，说明拖动的是舞台上的object，则不处理拖动图片
      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pan',
      })
      return
    } else if (
      [Controls.WavyLine, Controls.Circle].includes(
        this._toolManager.curActionType
      ) &&
      !this._isDisabled
    ) {
      // 画波浪线或者画圆
      this._toolManager.curTool?.mousedown?.(
        this._getPointOfViewportTransformed(
          e.srcEvent.offsetX,
          e.srcEvent.offsetY
        )
      )

      this.emit(DefinedEvents.TOUCH, {
        type: 'pan',
        isEditing: true,
      })
    } else {
      // 拖动图片
      this._prePanX = e.deltaX
      this._prePanY = e.deltaY
    }
  }

  /**
   * 单指移动
   */
  private _onPanMoveHandle(e: any): void {
    console.log('====_onPanMoveHandle', e)

    if (this.canvas.getActiveObject() && !this._isDisabled) {
      // 如果当前有正在活跃的action，说明拖动的是舞台上的object，则不处理拖动图片
      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pan',
      })
    } else if (
      this._toolManager.curActionType === Controls.Pencil &&
      !this._isDisabled
    ) {
      // 如果是画笔，则不处理
      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pan',
      })
    } else if (
      [Controls.WavyLine, Controls.Circle].includes(
        this._toolManager.curActionType
      ) &&
      !this._isDisabled
    ) {
      // 画波浪线或者画圆
      this._toolManager.curTool?.mousemove?.(
        this._getPointOfViewportTransformed(
          e.srcEvent.offsetX,
          e.srcEvent.offsetY
        )
      )
      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pan',
      })
    } else {
      // 拖动背景图片
      const panSuccess = this._pan(
        e.deltaX - this._prePanX,
        e.deltaY - this._prePanY
      )

      this._prePanX = e.deltaX
      this._prePanY = e.deltaY

      this.emit(DefinedEvents.TOUCH, {
        isEditing: panSuccess,
        type: 'pan',
      })
    }
  }

  /**
   * 单指移动结束
   * @param e 事件
   */
  private _onPanEndHandle(e: any): void {
    console.log('=====_onPanEndHandle')
    this._prePanX = 0
    this._prePanY = 0

    if (
      [Controls.WavyLine, Controls.Circle].includes(
        this._toolManager.curActionType
      ) &&
      !this._isDisabled
    ) {
      // 画波浪线或者画圆
      this._toolManager.curTool?.mouseup?.(
        this._getPointOfViewportTransformed(
          e.srcEvent.offsetX,
          e.srcEvent.offsetY
        )
      )
    }

    this.emit(DefinedEvents.TOUCH, {
      isEditing: false,
      type: 'pan',
    })

    this._hammerManager.off('panmove', this._onPanMoveHandle)
    this._hammerManager.off('panend', this._onPanEndHandle)
  }

  /**
   * 双指缩放
   * @param e 事件
   * @returns
   */
  private _onPinchStart(e: any): void {
    console.log('_onPinchStart')
    this._hammerManager.on('pinchend', this._onPinchEndHandle.bind(this))

    if (
      this._toolManager.curActionType === Controls.Pencil &&
      !this._isDisabled
    ) {
      // 如果是画笔，则不处理

      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pinch',
      })
    } else {
      // 其他需要放大的情况
      // 记录当前活动的object
      if (!this._isDisabled) {
        this._curPinchActiveObject = this.canvas.getActiveObject()
      }

      // 记录当前缩放比例
      this._preScale = e.scale

      // 记录当前缩放中心点
      this._prePanX = e.deltaX
      this._prePanY = e.deltaY

      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pinch',
      })

      this._hammerManager.on('pinchmove', this._onPinchMoveHandle.bind(this))
    }
  }

  /**
   * 双指缩放移动
   */
  private _onPinchMoveHandle(e: any): void {
    console.log('_onPinchMoveHandle', e.scale, this._preScale)

    if (
      this._toolManager.curActionType === Controls.Pencil &&
      !this._isDisabled
    ) {
      // 如果是画笔，则不处理
      this.emit(DefinedEvents.TOUCH, {
        isEditing: false,
        type: 'pinch',
      })
    } else if (this._curPinchActiveObject && !this._isDisabled) {
      // 如果画布上有活动的object，则控制object
      // 缩放活动的对象
      this._pinchObject(
        this._curPinchActiveObject,
        { x: e.deltaX - this._prePanX, y: e.deltaY - this._prePanY },
        e.scale - this._preScale
      )

      this.emit(DefinedEvents.TOUCH, {
        isEditing: true,
        type: 'pinch',
      })
    } else {
      // 缩放画布
      this._pinch(
        new fabric.Point(e.center.x, e.center.y),
        e.scale - this._preScale
      )
      // 移动画布，如果移动画布成功，则通知正在编辑，否则通知没有编辑
      const panSuccess = this._pan(
        e.deltaX - this._prePanX,
        e.deltaY - this._prePanY
      )

      this.emit(DefinedEvents.TOUCH, {
        isEditing: panSuccess,
        type: 'pinch',
      })
    }

    // 记录当前缩放比例
    this._preScale = e.scale
    this._prePanX = e.deltaX
    this._prePanY = e.deltaY
  }

  /**
   * 双指缩放移动
   */
  private _onPinchEndHandle(e): void {
    console.log('_onPinchEndHandle', e.scale, this._preScale)

    this._curPinchActiveObject = null

    this._preScale = 1
    this._prePanX = 0
    this._prePanY = 0

    this._hammerManager.off('pinchmove', this._onPinchMoveHandle)
    this._hammerManager.off('pinchend', this._onPinchEndHandle)

    this.emit(DefinedEvents.TOUCH, {
      isEditing: false,
      type: 'pinch',
    })
  }

  /**
   * 双击事件处理
   * @param e 事件对象
   */
  private _onDoubleTap(e): void {
    console.log('_onDoubleTap')
    // 恢复到原始大小
    this.canvas.setZoom(1)
  }

  /**
   * 单击事件处理
   * @param e 事件对象
   */
  private _onTap(e): void {
    console.log('_tap', this.canvas.getActiveObject())

    // 如果当前有正在活跃的action，说明点击的是舞台上的object，则不处理拖动图片
    if (this.canvas.getActiveObject()) return

    if (
      ![Controls.WavyLine, Controls.Circle].includes(
        this._toolManager.curActionType
      ) &&
      !this._isDisabled
    ) {
      const point = this._getPointOfViewportTransformed(
        e.srcEvent.offsetX,
        e.srcEvent.offsetY
      )
      this._toolManager.curTool?.mousedown?.(point)

      console.log('_onTap', this._toolManager.curTool, e, point)
    }
  }

  /**
   * 获取相对于转换后的画布的坐标
   * @param x 相对于转换前画布的x坐标
   * @param y 相对于转换前画布的y坐标
   * @returns
   */
  private _getPointOfViewportTransformed(x: number, y: number): fabric.Point {
    const [scaleX, , , scaleY, translateX, translateY] =
      this.canvas.viewportTransform
    return new fabric.Point(
      (x - translateX) / scaleX,
      (y - translateY) / scaleY
    )
  }

  /**
   * 添加舞台对象变化侦听
   */
  private _addObjectListener(): void {
    eventBus.on(
      `${this._correctId}:${DefinedEvents.CREATE_OBJ}`,
      this._onObjectCreated.bind(this)
    )
    eventBus.on(
      `${this._correctId}:${DefinedEvents.DELETE_OBJ}`,
      this._onObjectRemoved.bind(this)
    )
    eventBus.on(
      `${this._correctId}:${DefinedEvents.EDITING_ENTERED}`,
      this._onEditingEnterText.bind(this)
    )
    eventBus.on(
      `${this._correctId}:${DefinedEvents.EDITING_EXITED}`,
      this._onEditingExitedText.bind(this)
    )

    // 画布创建成功
    this.canvas.on(
      DefinedEvents.CANVAS_IMAGE_LOADED,
      this._onCanvasCreateSuccess.bind(this)
    )
  }

  /**
   * 侦听正在编辑文本
   */
  private _onEditingEnterText(): void {
    this.emit(DefinedEvents.EDITING_ENTERED)
  }

  /**
   * 侦听退出编辑文本
   */
  private _onEditingExitedText(): void {
    this.emit(DefinedEvents.EDITING_EXITED)
  }

  /**
   * 画布创建成功
   */
  private _onCanvasCreateSuccess(): void {
    // 批改工具准备成功
    this.emit(DefinedEvents.READY)
  }

  /**
   * 侦听创建对象
   * @param objInfo 对象信息
   */
  private _onObjectCreated(objInfo: any): void {
    this._onObjectsChange('create', objInfo)
  }

  /**
   * 侦听移除对象
   * @param objInfo 对象信息
   */
  private _onObjectRemoved(objInfo: any): void {
    this._onObjectsChange('delete', objInfo)
  }

  /**
   * 侦听舞台对象变化
   * @param type 对象操作类型 'create' | 'delete'
   * @param obj 对象
   */
  private _onObjectsChange(type: 'create' | 'delete', objInfo: any): void {
    this.emit(
      type === 'create' ? DefinedEvents.CREATE_OBJ : DefinedEvents.DELETE_OBJ,
      {
        correctId: this._correctId,
        target: objInfo,
        objects: this.canvas.getObjects(),
      }
    )
  }

  /**
   * 创建canvas节点
   * @param container 节点容器
   * @returns
   */
  private _createCanvasEle(container: HTMLElement): HTMLCanvasElement {
    const canvasEle = document.createElement('canvas')
    this._touchWrapper = document.createElement('div')
    this._touchWrapper.appendChild(canvasEle)

    const layoutLayer = document.createElement('div')
    layoutLayer.style.cssText = `width: 100%;height: 100%;display: inline-flex;justify-content: center;align-items: center;`
    layoutLayer.appendChild(this._touchWrapper)
    container.appendChild(layoutLayer)
    return canvasEle
  }

  /**
   * 单指拖动canvas画布
   * @param deltaX △x
   * @param deltaY △y
   * @returns 是否移动成功
   */
  private _pan(deltaX: number, deltaY: number): boolean {
    if (deltaX === 0 && deltaY === 0) return false

    // 改变前的画布转换矩阵
    const preViewportTransform = [...this.canvas.viewportTransform]
    // 目标画布转换矩阵
    const viewportTransform = [...this.canvas.viewportTransform]
    viewportTransform[4] = viewportTransform[4] + deltaX
    viewportTransform[5] = viewportTransform[5] + deltaY

    // 设置画布转换矩阵
    this.canvas.setViewportTransform(viewportTransform)

    // 判断是否移动成功
    // 如果y坐标发生变化，则认为是移动成功
    const panSuccess = !(
      preViewportTransform[5] === this.canvas.viewportTransform[5]
    )
    console.log('=========_pan', panSuccess)
    return panSuccess
  }

  /**
   *【Touch】双指缩放画布
   * @param centerPoint 缩放中心点
   * @param scale 增量的缩放比例
   */
  private _pinch(centerPoint: fabric.Point, scale: number) {
    const zoom = this.canvas.getZoom() + scale
    console.log('_pinch scale', scale)
    this.canvas.zoomToPoint(centerPoint, zoom)
  }

  /**
   *【Touch】双指缩放对象
   * @param target 缩放目标对象
   * @param position 增量的位移
   * @param scale 增量的缩放比例
   */
  private _pinchObject(target: fabric.Object, position: any, scale: number) {
    const { scaleX, scaleY, top, left } = target
    target
      .set({
        scaleX: scaleX + scale,
        scaleY: scaleY + scale,
        top: top + position.y,
        left: left + position.x,
      })
      .setCoords()

    this.canvas.requestRenderAll()

    console.log('_pinch object scale', scale)
  }

  /**
   * 禁用
   * @param value 是否禁用
   */
  disable(value: boolean): void {
    this._isDisabled = value
    this.canvas.skipTargetFind = value
    this.canvas.setZoom(1)
    this.canvas.discardActiveObject().renderAll()
    this._toolManager.disable(value)
  }

  /**
   * 设置当前操作
   */
  setCurActionTypeInfo(actionTypeInfo: ActionTypeInfo): void {
    console.log('actionTypeInfo', actionTypeInfo)
    this._toolManager.setCurActionType(actionTypeInfo)
  }

  // 设置图标相关的配置
  setIconConfig(iconConfig: IconConfig): void {
    console.log('设置图标相关配置', iconConfig)
    this._toolManager.setIconConfig(iconConfig)
  }

  /**
   * 获取当前操作类型
   */
  get curActionType(): number {
    return this._toolManager.curActionType
  }

  /**
   * 获取当前批改id
   */
  get correctId(): string {
    return this._correctId
  }

  /**
   * 重置
   */
  reset(): void {
    this._toolManager.clear()
  }

  /**
   * 销毁
   */
  destroy(): void {
    // 移除相关事件
    eventBus.off(
      `${this._correctId}:${DefinedEvents.CREATE_OBJ}`,
      this._onObjectCreated
    )
    eventBus.off(
      `${this._correctId}:${DefinedEvents.DELETE_OBJ}`,
      this._onObjectRemoved
    )

    eventBus.off(
      `${this._correctId}:${DefinedEvents.EDITING_ENTERED}`,
      this._onEditingEnterText.bind(this)
    )
    eventBus.off(
      `${this._correctId}:${DefinedEvents.EDITING_EXITED}`,
      this._onEditingExitedText.bind(this)
    )

    this.canvas.off(
      DefinedEvents.CANVAS_IMAGE_LOADED,
      this._onCanvasCreateSuccess.bind(this)
    )

    this._hammerManager.off('pinchstart', this._onPinchStart.bind(this))
    this._hammerManager.off('panstart', this._onPanStart.bind(this))
    this._hammerManager.off('doubletap', this._onDoubleTap.bind(this))
    this._hammerManager.off('tap', this._onTap.bind(this))

    // 销毁
    this._hammerManager.destroy()
    this._toolManager?.destroy()
    this.canvas.destroy()

    // 清理引用
    this.canvas = null
    this._toolManager = null
    this._hammerManager = null
  }
}

export default CorrectTool
