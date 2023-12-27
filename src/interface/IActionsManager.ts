/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-17 14:30:26
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-05 17:56:51
 * @FilePath: /correct-mobile/src/interface/IActionsManager.ts
 * @Description: 批改工具状态管理
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */

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
