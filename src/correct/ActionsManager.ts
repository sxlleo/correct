/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-29 11:34:00
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-08-17 14:37:02
 * @FilePath: /correct-mobile/src/correct/ActionsManager.ts
 * @Description: 工具管理
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import type { fabric } from 'fabric'
import type { IActionsManager } from '@/interface/IActionsManager'
import {
  Controls,
  type ActionTypeInfo,
  type RemarkParamsOfActionType,
  type SealParamsOfActionType,
  type ZoomParamsOfActionType,
  type IconConfig,
} from '@/interface/ICorrectTool'
import type { IAction } from '@/interface/IAction'
import {
  Ellipse,
  Text,
  Wavyline,
  Right,
  Wrong,
  NotCompleteRight,
  Zoom,
  Seal,
  Rotate,
  Flip,
  Pencil,
  Remark,
} from './actions/index'
import type CanvasWithImage from './CanvasWithImage'

import eventBus from '../util/EventBus'
import DefinedEvents from './DefinedEvents'
import SnapshotManager from './SnapshotManager'
import type ActionBase from './actions/ActionBase'

type Tools = {
  [key: number]: any
}

class ActionsManager implements IActionsManager {
  private _curActionType: number
  /** 当前工具 */
  private _curTool: IAction

  /**所有工具 */
  private _tools: Tools = {}

  /**当前舞台 */
  private _canvas: CanvasWithImage

  /**快照管理 */
  private _snapshotManager: SnapshotManager

  /**图标相关信息配置 */
  private _iconConfig: IconConfig

  /**批改工具id */
  private _correctId: string

  private _isDisabled = false

  constructor(correctId: string, canvas: CanvasWithImage) {
    this._canvas = canvas
    this._correctId = correctId
    this._snapshotManager = new SnapshotManager()

    // 侦听保存快照
    eventBus.on(
      `${this._correctId}:${DefinedEvents.SAVE_SNAPSHOT}`,
      this._onSaveSnapshot.bind(this)
    )
  }

  /**
   * 处理工具改变（没有提前创建，有的话使用，没有的话重新创建）
   * @param actionInfo 触发工具改变的参数
   */
  private _handleActionTypeChange(actionInfo: ActionTypeInfo): void {
    const { actionType, isKeep } = actionInfo
    console.log('@@@@@@@@_handleActionTypeChange', actionInfo)
    // todo:其实可以提前进行创建实例，待讨论
    let tool: IAction
    switch (actionType) {
      case Controls.Pencil:
        tool = this._createTool(actionType, isKeep, Pencil)
        break
      case Controls.Text:
        tool = this._createTool(actionType, isKeep, Text, this._iconConfig)
        break
      case Controls.Remark:
        tool = this._createTool(actionType, isKeep, Remark, this._iconConfig)
        break
      case Controls.Circle:
        tool = this._createTool(actionType, isKeep, Ellipse)
        break
      case Controls.WavyLine:
        tool = this._createTool(actionType, isKeep, Wavyline)
        break
      case Controls.Seal:
        tool = this._createTool(actionType, isKeep, Seal, this._iconConfig)
        break
      case Controls.Praise:
        // 表扬和批注是同一个工具，只是图标不同
        tool = this._createTool(actionType, isKeep, Seal, this._iconConfig)
        break
      case Controls.Right:
        tool = this._createTool(actionType, isKeep, Right, this._iconConfig)
        break
      case Controls.Wrong:
        tool = this._createTool(actionType, isKeep, Wrong, this._iconConfig)
        break
      case Controls.NotCompleteRight:
        tool = this._createTool(
          actionType,
          isKeep,
          NotCompleteRight,
          this._iconConfig
        )
        break
      case Controls.Zoom:
        tool = this._createTool(actionType, isKeep, Zoom)
        break
      case Controls.Rotate:
        tool = this._createTool(actionType, isKeep, Rotate)
        break
      case Controls.Flip:
        tool = this._createTool(actionType, isKeep, Flip)
        break
      case Controls.Clean:
        this.clear()
        break
      case Controls.Undo:
        this._undo()
        break
    }

    // 如果可以持续选中，则当前工具为新创建的工具
    if (isKeep) {
      this._curTool = tool
      this._curTool.disable?.(this._isDisabled)
    }

    // 发送启动事件
    tool &&
      eventBus.emit(`${this._correctId}:${DefinedEvents.TRIGGER_TOOL}`, {
        ...actionInfo,
      })
  }

  /**
   * 创建单个工具
   * @param type 工具类型
   * @param defClass 工具类型对应的类名
   * @returns 工具实例
   */
  private _createTool<T extends ActionBase>(
    type: number,
    isKeep: boolean,
    defClass: { new (...args: any): T },
    config?: any
  ): T {
    let tool = this._tools[type]
    if (!tool) {
      tool = this._tools[type] = new defClass(
        this._correctId,
        type,
        this._canvas,
        isKeep,
        config
      )
    }
    return tool
  }

  /**
   * 撤销
   */
  private _undo(): void {
    const undoCB: () => void = this._snapshotManager.pop()
    undoCB?.()
    console.log('点击撤销', undoCB)
  }

  /**
   * 清理
   */
  clear(): void {
    const objects: any[] = this._canvas.getObjects()
    this._canvas.remove(...objects)
    this._snapshotManager.clean()
  }

  /**
   * 销毁
   */
  destroy(): void {
    Object.values(this._tools).forEach((tool: IAction) => {
      tool.destroy()
    })
    eventBus.off(
      `${this._correctId}:${DefinedEvents.SAVE_SNAPSHOT}`,
      this._onSaveSnapshot
    )

    this._snapshotManager.destroy()
    this._snapshotManager = null
  }

  /**
   * 禁用
   * @param value
   */
  disable(value: boolean): void {
    this._isDisabled = value
    this._curTool?.disable?.(value)
  }

  /**
   * 设置当前操作
   * @param actionInfo 行为信息
   * @returns
   */
  setCurActionType(actionInfo: ActionTypeInfo): void {
    if (actionInfo === null || actionInfo == undefined) {
      this._cancelCurrentAction()
      return
    }

    if (actionInfo.isKeep) {
      // 如果此操作是选中操作（即isKeep === true）,需要过滤掉相同的操作
      if (!this._isSameAction(actionInfo))
        this._handleActionTypeChange(actionInfo)

      this._curActionType = actionInfo.actionType
      console.log('setCurActionType', this._curActionType)
    } else {
      this._handleActionTypeChange(actionInfo)
    }
  }

  /**
   * 设置图标相关配置
   * @param iconConfig 图标配置
   */
  setIconConfig(iconConfig: IconConfig): void {
    //
    const ICON_TOOLS = [
      Controls.Seal,
      Controls.Praise,
      Controls.Right,
      Controls.Wrong,
      Controls.NotCompleteRight,
      Controls.Text,
      Controls.Remark,
    ]

    // 更新图标相关工具的配置
    Object.keys(this._tools).forEach((key: string) => {
      const tool = this._tools[key]
      if (ICON_TOOLS.includes(tool.type)) {
        tool.updateConfig(iconConfig)
      }
    })
    this._iconConfig = iconConfig
  }

  /**
   * 和当前的action比较看是不是相同的一个
   * @param actionInfo
   * @returns
   */
  private _isSameAction(actionInfo: ActionTypeInfo): boolean {
    const { actionType, params } = actionInfo
    if (this._curActionType !== actionInfo.actionType) return false

    let isSame = false
    switch (actionType) {
      case Controls.Remark:
        isSame =
          this._curTool?.triggerParams.text ===
          (params as RemarkParamsOfActionType).text
        break
      case Controls.Seal:
        isSame =
          this._curTool?.triggerParams.insertIconType ===
          (params as SealParamsOfActionType).insertIconType
        break
      case Controls.Zoom:
        isSame =
          this._curTool?.triggerParams.type ===
          (params as ZoomParamsOfActionType).type
        break
    }
    return isSame
  }

  /**
   * 取消当前操作
   */
  private _cancelCurrentAction(): void {
    if (this._curTool) {
      // 发送启动事件
      eventBus.emit(`${this._correctId}:${DefinedEvents.TRIGGER_TOOL}`, null)
    }

    this._curActionType = null
    this._curTool = null
  }

  /**
   * 保存快照
   */
  private _onSaveSnapshot(undo: () => void): void {
    this._snapshotManager.add(undo)
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

  get snapshotManager(): SnapshotManager {
    return this._snapshotManager
  }
}

export default ActionsManager
