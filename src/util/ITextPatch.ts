/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-02-16 11:37:24
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-06-21 10:24:07
 * @FilePath: /jzx-correct-mobile/src/util/ITextPatch.ts
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */

// 此处的兼容可以通过IText的hiddenTextareaContainer属性来设置
// import { fabric } from 'fabric'
// fabric.IText.prototype.initHiddenTextarea = (function (initHiddenTextarea) {
//   return function () {
//     const result = initHiddenTextarea.apply(this)
//     document.body.removeChild(this.hiddenTextarea)
//     this.canvas.wrapperEl.appendChild(this.hiddenTextarea)

//     // requestAnimationFrame(() => {
//     //   this.hiddenTextarea.style.top = `${this.top}px`
//     //   this.hiddenTextarea.style.left = `${this.left}px`
//     // })
//     console.log('test', this.hiddenTextareaContainer)
//     console.log('insert text position', `${this.top}px`, `${this.left}px`)
//     console.log('insert text', this, this.hiddenTextarea, this.hiddenTextarea.style.top)
//     return result
//   }
// })(fabric.IText.prototype.initHiddenTextarea)

import { fabric } from 'fabric'

fabric.IText.prototype.updateTextareaPosition = (function (
  updateTextareaPosition
) {
  return function () {
    updateTextareaPosition.apply(this)
    requestAnimationFrame(() => {
      // this.hiddenTextarea.style.top = `${this.top}px`
      // this.hiddenTextarea.style.left = `${this.left}px`
      // if (this.isEditing) this.hiddenTextarea.focus()
    })
  }
})(fabric.IText.prototype.updateTextareaPosition)
