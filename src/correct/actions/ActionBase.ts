/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-31 16:18:37
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-03-27 15:49:39
 * @FilePath: /jzx-correct/src/correct/actions/ActionBase.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */

import type CanvasWithImage from '../CanvasWithImage'
import type { fabric } from 'fabric'
import type { IAction } from '../../interface/IAction'

import eventBus from '@/util/EventBus'
import EventMitter from '../../util/EventEmitter'
import DefinedEvents from '../DefinedEvents'

import { canKeep } from '../config'

export default class ActionBase extends EventMitter implements IAction {
  isKeep: boolean
  protected canvas: CanvasWithImage
  /**
   * 是否开启工具
   */
  protected isOn: boolean
  /**
   * 触发工具携带的参数，不同的工具，此参数类型各不相同
   */
  protected triggerParams: any
  /**
   * 工具类型
   */
  _type: number
  /**
   * 批改的unique id
   */
  correctId: string

  constructor(correctId: string, type: number, canvas: CanvasWithImage, isKeep = true) {
    super()
    this.correctId = correctId
    this._type = type
    this.canvas = canvas
    this.isKeep = isKeep
    eventBus.on(`${this.correctId}:${DefinedEvents.TRIGGER_TOOL}`, this.trigger.bind(this))
  }

  trigger(stateObj: any) {
    // console.log('trigger', stateObj)
    if (stateObj.actionType === this._type) {
      this.triggerParams = stateObj.params
      this._handleOn()
    } else {
      canKeep(stateObj.actionType) && this._handleOff()
    }
  }

  _handleOn() {
    this.isOn = true
  }

  _handleOff() {
    this.isOn = false
  }

  addListener(obj: fabric.Object): void {
    obj.on('added', () => {
      eventBus.emit(`${this.correctId}:${DefinedEvents.CREATE_OBJ}`)
    })
    obj.on('removed', () => {
      console.log(`${DefinedEvents.DELETE_OBJ}`)
      eventBus.emit(`${this.correctId}:${DefinedEvents.DELETE_OBJ}`)
    })
  }

  destroy(): void {
    eventBus.off(`${this.correctId}:${DefinedEvents.TRIGGER_TOOL}`, this.trigger)
  }
  reset(): void {
    //
  }
}
