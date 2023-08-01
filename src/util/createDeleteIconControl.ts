/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-02-03 16:14:09
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-07-18 12:42:19
 * @FilePath: /jzx-correct/src/util/createDeleteIconControl.ts
 * @Description: 在fabric的原型链上面补充自定义删除按钮逻辑
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */
import { fabric } from 'fabric'

fabric.Object.prototype.transparentCorners = false
// 设置角的颜色
fabric.Object.prototype.cornerColor = 'white'
// 设置边框的颜色
fabric.Object.prototype.borderColor = 'white'
// 设置边框的宽度
fabric.Object.prototype.borderScaleFactor = 2

// 创建删除按钮
const deleteIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC4xNjQwNjIiIHk9IjAuMzA1NjY0IiB3aWR0aD0iNDkuMzg4IiBoZWlnaHQ9IjQ5LjM4OCIgcng9IjI0LjY5NCIgZmlsbD0id2hpdGUiLz4KPGcgb3BhY2l0eT0iMC42NSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAuNDQ3MSAxOS45OTg1QzE5LjcxMDggMTkuOTk4NSAxOS4yMjcgMTkuMjI5NyAxOS41NDU2IDE4LjU2NThMMjAuOTg1NiAxNS41NjU5QzIxLjE1MiAxNS4yMTkyIDIxLjUwMjUgMTQuOTk4NiAyMS44ODcxIDE0Ljk5ODZIMjcuODI4NUMyOC4yMTMxIDE0Ljk5ODYgMjguNTYzNiAxNS4yMTkyIDI4LjczIDE1LjU2NTlMMzAuMTcgMTguNTY1OEMzMC40ODg2IDE5LjIyOTcgMzAuMDA0OCAxOS45OTg1IDI5LjI2ODUgMTkuOTk4NUgyMC40NDcxWk0yMy4yNTkyIDE3Ljk5ODZDMjIuNjYwMiAxNy45OTg2IDIyLjMwMjkgMTcuMzMxIDIyLjYzNTIgMTYuODMyNkMyMi43NzQzIDE2LjYyMzkgMjMuMDA4NCAxNi40OTg2IDIzLjI1OTIgMTYuNDk4NkgyNi40NTY0QzI2LjcwNzEgMTYuNDk4NiAyNi45NDEzIDE2LjYyMzkgMjcuMDgwNCAxNi44MzI2QzI3LjQxMjcgMTcuMzMxIDI3LjA1NTQgMTcuOTk4NiAyNi40NTY0IDE3Ljk5ODZIMjMuMjU5MloiIGZpbGw9IiM3MDc4OEMiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy4zNTg0IDMxLjk5NzhDMTcuMzU4NCAzMy42NTQ2IDE4LjcwMTUgMzQuOTk3NyAyMC4zNTgzIDM0Ljk5NzdIMjkuMzU4MUMzMS4wMTUgMzQuOTk3NyAzMi4zNTgxIDMzLjY1NDYgMzIuMzU4MSAzMS45OTc4VjE3Ljk5OEgxNy4zNTg0VjMxLjk5NzhaTTIxLjg1ODQgMjMuOTk4MUMyMS44NTg0IDIzLjQ0NTggMjIuMzA2MSAyMi45OTgxIDIyLjg1ODQgMjIuOTk4MUMyMy40MTA3IDIyLjk5ODEgMjMuODU4NCAyMy40NDU4IDIzLjg1ODQgMjMuOTk4MVYyOC45OThDMjMuODU4NCAyOS41NTAzIDIzLjQxMDcgMjkuOTk4IDIyLjg1ODQgMjkuOTk4QzIyLjMwNjEgMjkuOTk4IDIxLjg1ODQgMjkuNTUwMyAyMS44NTg0IDI4Ljk5OFYyMy45OTgxWk0yNi44NTgxIDIyLjk5ODRDMjYuMzA1OCAyMi45OTg0IDI1Ljg1ODEgMjMuNDQ2MSAyNS44NTgxIDIzLjk5ODNWMjguOTk4MkMyNS44NTgxIDI5LjU1MDUgMjYuMzA1OCAyOS45OTgyIDI2Ljg1ODEgMjkuOTk4MkMyNy40MTA0IDI5Ljk5ODIgMjcuODU4MSAyOS41NTA1IDI3Ljg1ODEgMjguOTk4MlYyMy45OTgzQzI3Ljg1ODEgMjMuNDQ2MSAyNy40MTA0IDIyLjk5ODQgMjYuODU4MSAyMi45OTg0WiIgZmlsbD0iIzcwNzg4QyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM0LjM1NzUgMTguOTk4QzM0LjM1NzUgMTkuNTUwMyAzMy45MDk4IDE5Ljk5OCAzMy4zNTc1IDE5Ljk5OEgxNi4zNTc5QzE1LjgwNTYgMTkuOTk4IDE1LjM1NzkgMTkuNTUwMyAxNS4zNTc5IDE4Ljk5OEMxNS4zNTc5IDE4LjQ0NTggMTUuODA1NiAxNy45OTggMTYuMzU3OSAxNy45OThIMzMuMzU3NUMzMy45MDk4IDE3Ljk5OCAzNC4zNTc1IDE4LjQ0NTggMzQuMzU3NSAxOC45OThaIiBmaWxsPSIjNzA3ODhDIi8+CjwvZz4KPC9zdmc+Cg=='
  
const deleteImg = document.createElement('img')
deleteImg.src = deleteIcon

function deleteObject(eventData: any, transform: any, x, y): void {
  console.log('eventData', eventData)
  const target = transform.target
  const canvas = target.canvas
  canvas.remove(target)
  canvas.requestRenderAll()
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  const size = this.cornerSize
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size)
  ctx.restore()
}
const deleteControl = new fabric.Control(({
  x: 0.5,
  y: -0.5,
  cursorStyle: 'pointer',
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24
} as any))

fabric.Object.prototype.controls.deleteControl = deleteControl
fabric.Textbox.prototype.controls.deleteControl = deleteControl
console.log('delete control')
