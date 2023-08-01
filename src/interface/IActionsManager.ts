/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-17 14:30:26
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-02-27 17:07:17
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/core/interface/IActionsManager.ts
 * @Description: 批改工具状态管理
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
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
