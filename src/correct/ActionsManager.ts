/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-01-29 11:34:00
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-03-24 16:43:01
 * @FilePath: /jzx-correct/src/correct/ActionsManager.ts
 * @Description: 工具管理
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */
import type { fabric } from 'fabric'
import type { IActionsManager } from '../interface/IActionsManager'
import { Controls, type ActionTypeInfo } from '../interface/ICorrectTool'
import type { IAction } from '../interface/IAction'
import { Ellipse, Text, Wavyline, Right, Wrong, NotCompleteRight, Zoom, Seal, Rotate, Flip } from './actions/index'
import type CanvasWithImage from './CanvasWithImage'

import eventBus from '../util/EventBus'
import DefinedEvents from './DefinedEvents'
class ActionsManager implements IActionsManager {
  private _curActionType: number
  /**
   * 当前工具
   */
  private _curTool: IAction
  /**
   * 所有工具
   */
  _tools: any = {}
  /**
   * 舞台上所有创建完成的对象
   */
  _objs: fabric.Object[] = []

  /**
   * 当前舞台
   */
  _canvas: CanvasWithImage

  private _correctId: string

  constructor(correctId: string, canvas: CanvasWithImage) {
    this._canvas = canvas
    this._correctId = correctId
  }

  /**
   * 处理工具改变（没有提前创建，有的话使用，没有的话重新创建）
   * todo: actionInfo类型待定义
   * @param actionInfo 触发工具改变的参数
   */
  private _handleActionTypeChange(actionInfo: ActionTypeInfo): void {
    const { actionType } = actionInfo
    console.log('@@@@@@@@_handleActionTypeChange', actionInfo)
    // todo:其实可以提前进行创建实例，待讨论
    let tool: IAction
    switch (actionType) {
      case Controls.Text:
        tool = this._curTool = this._createTool(actionType, Text)
        break
      case Controls.Circle:
        tool = this._curTool = this._createTool(actionType, Ellipse)
        break
      case Controls.WavyLine:
        tool = this._curTool = this._createTool(actionType, Wavyline)
        break
      case Controls.Seal:
        tool = this._createTool(actionType, Seal)
        break
      case Controls.Right:
        tool = this._curTool = this._createTool(actionType, Right)
        break
      case Controls.Wrong:
        tool = this._curTool = this._createTool(actionType, Wrong)

        break
      case Controls.NotCompleteRight:
        tool = this._curTool = this._createTool(actionType, NotCompleteRight)
        break
      case Controls.Zoom:
        tool = this._createTool(actionType, Zoom)
        break
      case Controls.Rotate:
        tool = this._createTool(actionType, Rotate)
        break
      case Controls.Flip:
        tool = this._createTool(actionType, Flip)
        break
      case Controls.Clean:
        this._clear()
        break
    }

    // console.log('@@@@@@@curtool', this._correctId, this._curTool)

    // 发送启动事件
    tool &&
      eventBus.emit(`${this._correctId}:${DefinedEvents.TRIGGER_TOOL}`, {
        ...actionInfo,
        isKeep: tool.isKeep
      })
  }

  /**
   * 创建单个工具
   * @param type 工具类型
   * @param defClass 工具类型对应的类名
   * @returns 工具实例
   */
  _createTool(type: number, defClass: any): IAction {
    let tool = this._tools[type]
    if (!tool) {
      tool = this._tools[type] = new defClass(this._correctId, type, this._canvas)
    }
    return tool
  }

  /**
   * 清理
   */
  _clear(): void {
    const objects = this._canvas.getObjects()
    this._canvas.remove(...objects)
  }

  /**
   * 销毁
   */
  destroy(): void {
    //
    Object.values(this._tools).forEach((tool: IAction) => {
      tool.destroy()
    })
  }

  /**
   * 设置当前操作
   * @param actionInfo 行为信息
   * @returns
   */
  setCurActionType(actionInfo: ActionTypeInfo) {
    if (actionInfo === null || actionInfo == undefined) {
      this._curActionType = null
      return
    }

    if (actionInfo.isKeep) {
      // 如果此操作是选中操作（即isKeep === true）,需要过滤掉相同的操作
      if (this._curActionType !== actionInfo.actionType) this._handleActionTypeChange(actionInfo)
      this._curActionType = actionInfo.actionType
    } else {
      this._handleActionTypeChange(actionInfo)
    }
  }

  /**
   * 获取当前操作类型
   */
  get curActionType(): number {
    return this._curActionType
  }

  get curTool(): IAction {
    return this._curTool
  }
}

export default ActionsManager
