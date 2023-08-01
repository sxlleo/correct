/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-03-03 11:37:19
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-03-03 11:44:54
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/core/correct/config.ts
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */
import { Controls } from '../interface/ICorrectTool'
/**
 *  检测当前行为是否可以一直选中
 * @param actionType 行为类型
 * @returns 是否可以持续选中
 */
function canKeep(actionType: number): boolean {
  return ![Controls.Seal, Controls.Zoom, Controls.Rotate, Controls.Clean].includes(actionType)
}

export { canKeep }
