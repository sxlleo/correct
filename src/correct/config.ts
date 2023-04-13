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
