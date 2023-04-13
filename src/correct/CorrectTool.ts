import type { ICorrectTool, ActionTypeInfo } from '../interface/ICorrectTool'
import type { ToolParamConfig } from '../interface/IAction'
import ActionsManager from './ActionsManager'
import CanvasWithImage from './CanvasWithImage'
import { v4 } from 'uuid'

import DefinedEvents from './DefinedEvents'
import eventBus from '@/util/EventBus'
import EventMitter from '../util/EventEmitter'

// 创建删除图标
import '../util/createDeleteIconControl'

class CorrectTool extends EventMitter implements ICorrectTool {
  // canvas实例
  canvas: CanvasWithImage
  // canvas的父节点
  private _container: HTMLElement

  private _toolManager: ActionsManager

  private _correctId: string = v4()

  private _isDisabled = false

  /**
   * 被添加的元素
   * todo: 如果Object实例身上可以被挂在属性，则可以不维护_addedObjects
   */
  _addedObjects: any[] = []

  constructor(config: ToolParamConfig) {
    super()
    const { container } = config
    this._container = container

    this._initializeCanvas(config)
    this._addCanvasEventListener()
    this._addObjectListener();

    this._toolManager = new ActionsManager(this._correctId, this.canvas)

    console.log('correct tool constructor')
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
        preserveObjectStacking: true,
        isDrawingMode: false,
        backgroundColor: '#f2f7fe'
      },
      this._correctId,
      config
    )
  }

  /**
   * 添加舞台对象变化侦听
   */
  private _addObjectListener(): void {
    eventBus.on(`${this._correctId}:${DefinedEvents.CREATE_OBJ}`, this._onObjectsChange.bind(this, 'create'))
    eventBus.on(`${this._correctId}:${DefinedEvents.DELETE_OBJ}`, this._onObjectsChange.bind(this, 'delete'))
  }

  /**
   * 侦听舞台对象变化
   * @param type 对象操作类型 'create' | 'delete'
   */
  private _onObjectsChange(type: 'create' | 'delete') :void {
    // @ts-ignore
    this.emit(type === 'create' ? DefinedEvents.CREATE_OBJ: DefinedEvents.DELETE_OBJ)
  }

  private _addCanvasEventListener(): void {
    this.canvas.on('mouse:down', this._onMouseDown.bind(this))
    this.canvas.on('mouse:move', this._onMouseMove.bind(this))
    this.canvas.on('mouse:up', this._onMouseUp.bind(this))
  }

  private _onMouseDown(e: any): void {
    console.log('@@@@@_onMouseDown', this._correctId, this._isDisabled, e.target, this.canvas.getActiveObject())
    if (this._isDisabled) return
    if (e.target) return
    this._toolManager.curTool?.mousedown(e.absolutePointer)
  }

  private _onMouseMove(e: any): void {
    if (this._isDisabled) return
    // console.log('@@@@@_onMouseMove')
    this._toolManager.curTool?.mousemove?.(e.absolutePointer)
  }

  private _onMouseUp(e: any): void {
    if (this._isDisabled) return
    // console.log('@@@@@_onMouseUp', e)
    this._toolManager.curTool?.mouseup?.(e.absolutePointer)
  }

  private _createCanvasEle(container: HTMLElement): HTMLCanvasElement {
    const canvasEle = document.createElement('canvas')
    const canvasScrollWrapper = document.createElement('div')
    canvasScrollWrapper.style.cssText = `overflow: auto;width: 100%;height: 100%;display: flex;justify-content: center;`
    canvasScrollWrapper.appendChild(canvasEle)
    container.appendChild(canvasScrollWrapper)
    return canvasEle
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
  }

  /**
   * 重置
   */
  reset(): void {
    this._addedObjects = []
    this.canvas.remove(...this.canvas.getObjects())
  }

  /**
   * 销毁
   */
  destroy(): void {
    this.canvas.off('mouse:down', this._onMouseDown)
    this.canvas.off('mouse:move', this._onMouseMove)
    this.canvas.off('mouse:up', this._onMouseUp)

    eventBus.off(`${this._correctId}:${DefinedEvents.CREATE_OBJ}`, this._onObjectsChange)
    eventBus.off(`${this._correctId}:${DefinedEvents.DELETE_OBJ}`, this._onObjectsChange)

    this._toolManager?.destroy()
    this.canvas.destroy()
  }

  /**
   * 是否被编辑过
   */
  get isEdited(): boolean {
    return this._addedObjects.length > 0
  }

  /**
   * 设置当前操作
   */
  setCurActionTypeInfo(actionTypeInfo: ActionTypeInfo) {
    this._toolManager.setCurActionType(actionTypeInfo)
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
}

export default CorrectTool
