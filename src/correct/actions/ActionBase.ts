/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-31 16:18:37
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-08-17 14:34:15
 * @FilePath: /correct-mobile/src/correct/actions/ActionBase.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import type CanvasWithImage from '../CanvasWithImage'
import type { fabric } from 'fabric'
import type { IAction } from '@/interface/IAction'

import eventBus from '@/util/EventBus'
import EventMitter from '@/util/EventEmitter'
import DefinedEvents from '../DefinedEvents'

import {
  createDeleteControl,
  deleteHandle,
} from '@/util/createDeleteIconControl'

// import { Controls } from '@/interface/ICorrectTool'

// /**
//  * 不需要快照的工具
//  */
// const NOT_SNAPSHOT_ACTIONS = [Controls.Praise]

export default class ActionBase extends EventMitter implements IAction {
  /**
   * 是否一直选中
   */
  isKeep: boolean
  /**
   * 画布
   */
  protected canvas: CanvasWithImage
  /**
   * 是否开启工具
   */
  protected isOn: boolean
  /**
   * 触发工具携带的参数，不同的工具，此参数类型各不相同
   */
  _triggerParams: any

  externalParams: Record<string | number, any>
  /**
   * 工具类型
   */
  _type: number
  /**
   * 批改的unique id
   */
  correctId: string

  /**
   * 工具配置
   */
  _config: any

  /**
   * 缓存所有添加过的对象
   */
  _cacheObjects: fabric.Object[] = []

  constructor(
    correctId: string,
    type: number,
    canvas: CanvasWithImage,
    isKeep: boolean,
    config: any
  ) {
    super()
    this.correctId = correctId
    this._type = type
    this.canvas = canvas
    this.isKeep = isKeep
    this._config = {
      ...config,
    }
    eventBus.on(
      `${this.correctId}:${DefinedEvents.TRIGGER_TOOL}`,
      this.trigger.bind(this)
    )
  }

  trigger(stateObj: any) {
    if (stateObj?.actionType === this._type) {
      this._triggerParams = stateObj.params
      this.externalParams = stateObj.externalParams
      this._handleOn()
    } else {
      // 用户取消选中或者切换的是可以选中的工具的时候，之前的工具需要取消选中
      if (!stateObj || stateObj.isKeep) this._handleOff()
    }
  }

  _handleOn(): void {
    this.isOn = true
  }

  _handleOff(): void {
    this.isOn = false
  }

  /**
   * 给对象添加侦听事件
   * @param obj 对象实例
   * @param isAdded 是否已经添加到画布
   */
  addListener(obj: fabric.Object, isAdded?: boolean): void {
    // 缓存添加过的对象
    this._cacheObjects.push(obj)

    // 设置对象类型
    obj.__actionType = this._type
    obj.__externalParams = this.externalParams

    // 添加的时候记录对象的相关信息
    this._setOriginalViewportTransformBeforeModified(obj)

    // 生成创建的快照
    eventBus.emit(
      `${this.correctId}:${DefinedEvents.SAVE_SNAPSHOT}`,
      this._undoAdd(obj)
    )

    // 添加删除控件
    obj.controls.deleteControl = createDeleteControl(
      function (eventData: any, transform: any) {
        if (!transform?.target) return
        const target = transform.target
        const canvas = target.canvas

        // 生成删除的快照
        eventBus.emit(
          `${this.correctId}:${DefinedEvents.SAVE_SNAPSHOT}`,
          this._undoRemove(target, canvas)
        )

        deleteHandle(eventData, transform)
      }.bind(this)
    )

    // 侦听事件
    // 如果默认已经被添加了，则不需要侦听added，直接触发added事件
    if (isAdded) {
      this._onAdded()
    } else {
      obj.on('added', this._onAdded.bind(this))
    }
    obj.on('removed', this._removed.bind(this))

    obj.on('modified', (e) => {
      console.log('modified', obj)

      // 对象被用户编辑了
      eventBus.emit(
        `${this.correctId}:${DefinedEvents.SAVE_SNAPSHOT}`,
        this._undoModified(
          obj,
          // @ts-ignore
          obj.originalViewportTransform
        )
      )

      this._setOriginalViewportTransformBeforeModified(obj)
    })
  }

  /**对象被添加 */
  private _onAdded(): void {
    console.log('_onAdded')
    eventBus.emit(`${this.correctId}:${DefinedEvents.CREATE_OBJ}`, {
      __actionType: this._type,
      __externalParams: this.externalParams,
    })
  }

  /**对象被移除 */
  _removed(): void {
    console.log('_removed')
    eventBus.emit(`${this.correctId}:${DefinedEvents.DELETE_OBJ}`, {
      __actionType: this._type,
      __externalParams: this.externalParams,
    })
  }

  /**
   * 撤销修改
   * @param target 当前操作的对象
   * @param originalViewportTransform 原始的坐标信息
   * @returns {Function}
   */
  private _undoModified(
    target: fabric.Object,
    originalViewportTransform: any
  ): () => void {
    return function () {
      // 获取原始的坐标
      console.log('=======这是之前的信息', originalViewportTransform)
      target.set(originalViewportTransform)
      target.canvas.renderAll()
    }
  }

  /**
   * 撤销添加
   * @param target
   * @returns {Function}
   */
  private _undoAdd(target: fabric.Object): () => void {
    return () => {
      target.canvas.remove(target)
    }
  }
  /**
   * 撤销移出
   * @param target
   * @param canvas
   * @returns {Function}
   */
  private _undoRemove(
    target: fabric.Object,
    canvas: CanvasWithImage
  ): () => void {
    return () => {
      canvas.add(target)
    }
  }

  /**
   * 设置对象原始信息，撤销对象的修改会用到
   * @param obj 对象
   */
  private _setOriginalViewportTransformBeforeModified(
    obj: fabric.Object | fabric.Text
  ): void {
    const {
      width,
      height,
      scaleX,
      scaleY,
      skewX,
      skewY,
      angle,
      strokeWidth,
      top,
      left,
      // @ts-ignore
      text,
    } = obj

    console.log('text', text)
    // @ts-ignore
    obj.originalViewportTransform = {
      width,
      height,
      scaleX,
      scaleY,
      skewX,
      skewY,
      angle,
      strokeWidth,
      top,
      left,
      text,
    }
    // @ts-ignore
    console.log('obj.viewportTransform', obj.originalViewportTransform)
  }

  /**
   * 更新配置
   * @param config 配置文件
   */
  updateConfig(config: any): void {
    this._config = {
      ...this._config,
      ...config,
    }
  }

  get triggerParams(): any {
    return this._triggerParams
  }

  get type(): number {
    return this._type
  }

  destroy(): void {
    eventBus.off(
      `${this.correctId}:${DefinedEvents.TRIGGER_TOOL}`,
      this.trigger
    )

    this._cacheObjects.forEach((obj) => {
      obj?.off?.()
    })
    this._cacheObjects = null
  }

  reset(): void {
    //
  }
}
