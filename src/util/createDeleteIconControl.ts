/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-02-03 16:14:09
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-14 17:34:25
 * @FilePath: /correct-mobile/src/util/createDeleteIconControl.ts
 * @Description: 在fabric的原型链上面补充自定义删除按钮逻辑
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
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
// const deleteIcon =
//   "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E"
const deleteIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC4xNjQwNjIiIHk9IjAuMzA1NjY0IiB3aWR0aD0iNDkuMzg4IiBoZWlnaHQ9IjQ5LjM4OCIgcng9IjI0LjY5NCIgZmlsbD0id2hpdGUiLz4KPGcgb3BhY2l0eT0iMC42NSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAuNDQ3MSAxOS45OTg1QzE5LjcxMDggMTkuOTk4NSAxOS4yMjcgMTkuMjI5NyAxOS41NDU2IDE4LjU2NThMMjAuOTg1NiAxNS41NjU5QzIxLjE1MiAxNS4yMTkyIDIxLjUwMjUgMTQuOTk4NiAyMS44ODcxIDE0Ljk5ODZIMjcuODI4NUMyOC4yMTMxIDE0Ljk5ODYgMjguNTYzNiAxNS4yMTkyIDI4LjczIDE1LjU2NTlMMzAuMTcgMTguNTY1OEMzMC40ODg2IDE5LjIyOTcgMzAuMDA0OCAxOS45OTg1IDI5LjI2ODUgMTkuOTk4NUgyMC40NDcxWk0yMy4yNTkyIDE3Ljk5ODZDMjIuNjYwMiAxNy45OTg2IDIyLjMwMjkgMTcuMzMxIDIyLjYzNTIgMTYuODMyNkMyMi43NzQzIDE2LjYyMzkgMjMuMDA4NCAxNi40OTg2IDIzLjI1OTIgMTYuNDk4NkgyNi40NTY0QzI2LjcwNzEgMTYuNDk4NiAyNi45NDEzIDE2LjYyMzkgMjcuMDgwNCAxNi44MzI2QzI3LjQxMjcgMTcuMzMxIDI3LjA1NTQgMTcuOTk4NiAyNi40NTY0IDE3Ljk5ODZIMjMuMjU5MloiIGZpbGw9IiM3MDc4OEMiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy4zNTg0IDMxLjk5NzhDMTcuMzU4NCAzMy42NTQ2IDE4LjcwMTUgMzQuOTk3NyAyMC4zNTgzIDM0Ljk5NzdIMjkuMzU4MUMzMS4wMTUgMzQuOTk3NyAzMi4zNTgxIDMzLjY1NDYgMzIuMzU4MSAzMS45OTc4VjE3Ljk5OEgxNy4zNTg0VjMxLjk5NzhaTTIxLjg1ODQgMjMuOTk4MUMyMS44NTg0IDIzLjQ0NTggMjIuMzA2MSAyMi45OTgxIDIyLjg1ODQgMjIuOTk4MUMyMy40MTA3IDIyLjk5ODEgMjMuODU4NCAyMy40NDU4IDIzLjg1ODQgMjMuOTk4MVYyOC45OThDMjMuODU4NCAyOS41NTAzIDIzLjQxMDcgMjkuOTk4IDIyLjg1ODQgMjkuOTk4QzIyLjMwNjEgMjkuOTk4IDIxLjg1ODQgMjkuNTUwMyAyMS44NTg0IDI4Ljk5OFYyMy45OTgxWk0yNi44NTgxIDIyLjk5ODRDMjYuMzA1OCAyMi45OTg0IDI1Ljg1ODEgMjMuNDQ2MSAyNS44NTgxIDIzLjk5ODNWMjguOTk4MkMyNS44NTgxIDI5LjU1MDUgMjYuMzA1OCAyOS45OTgyIDI2Ljg1ODEgMjkuOTk4MkMyNy40MTA0IDI5Ljk5ODIgMjcuODU4MSAyOS41NTA1IDI3Ljg1ODEgMjguOTk4MlYyMy45OTgzQzI3Ljg1ODEgMjMuNDQ2MSAyNy40MTA0IDIyLjk5ODQgMjYuODU4MSAyMi45OTg0WiIgZmlsbD0iIzcwNzg4QyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM0LjM1NzUgMTguOTk4QzM0LjM1NzUgMTkuNTUwMyAzMy45MDk4IDE5Ljk5OCAzMy4zNTc1IDE5Ljk5OEgxNi4zNTc5QzE1LjgwNTYgMTkuOTk4IDE1LjM1NzkgMTkuNTUwMyAxNS4zNTc5IDE4Ljk5OEMxNS4zNTc5IDE4LjQ0NTggMTUuODA1NiAxNy45OTggMTYuMzU3OSAxNy45OThIMzMuMzU3NUMzMy45MDk4IDE3Ljk5OCAzNC4zNTc1IDE4LjQ0NTggMzQuMzU3NSAxOC45OThaIiBmaWxsPSIjNzA3ODhDIi8+CjwvZz4KPC9zdmc+Cg=='

const deleteImg = document.createElement('img')
deleteImg.src = deleteIcon

function deleteHandle(eventData: any, transform: any): void {
  // console.log('eventData', eventData)
  const target = transform.target
  const canvas = target.canvas
  console.log('删除回调方法：', target)
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

function createDeleteControl(
  mouseUpHandler: (eventData: any, transform: any) => void
) {
  return new fabric.Control({
    x: 0.5,
    y: -0.5,
    // 控制touch区域的大小
    touchSizeX: 49,
    touchSizeY: 49,
    cursorStyle: 'pointer',
    mouseUpHandler: mouseUpHandler,
    render: renderIcon,
    // 控制icon的大小
    cornerSize: 49,
  } as any)
}

export { createDeleteControl, deleteHandle }
