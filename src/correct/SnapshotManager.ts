/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-06-14 22:39:02
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-08-17 14:31:06
 * @FilePath: /jzx-correct-mobile/src/correct/SnapshotManager.ts
 * @Description:
 */
class SnapshotManager {
  _undoStack: any[]
  constructor() {
    this._undoStack = []
  }

  add(snapshot: () => void): void {
    console.log('添加快照', snapshot)
    this._undoStack.push(snapshot)
  }

  pop(): () => void {
    return this._undoStack.pop()
  }

  clean(): void {
    this._undoStack = []
  }

  destroy(): void {
    this._undoStack = null
  }

  get undoStack(): any[] {
    return this._undoStack
  }
}

export default SnapshotManager
