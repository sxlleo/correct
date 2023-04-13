import type { IAction } from './IAction'
interface IActionsManager {
  // _curState: number
  get curTool(): IAction
  destroy(): void
  // 改变状态
  set curActionType(value: any)
  // 获取状态
  get curActionType(): number
}

export type { IActionsManager }
