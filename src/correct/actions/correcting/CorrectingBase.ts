import type { fabric } from 'fabric'
import ActionBase from "../ActionBase"
import type CanvasWithImage from '@/correct/CanvasWithImage'

class CorrectingBase extends ActionBase{
  /**
   * 加载完成的图标
   */
  _loadedIcon: fabric.Image

  constructor(correctId: string, type: number, canvas: CanvasWithImage) {
    super(correctId, type, canvas)
  }

  /**
   * 复制图片回调
   * @param pointer 创建的图片的位置
   * @param img 图片实例对象
   */
  _onClone(pointer: fabric.Point, img: fabric.Image): void {
    img.set({
      top: pointer.y,
      left: pointer.x,
      originX: 'center',
      originY: 'center'
    })

    img.__actionType = this._type
    this.addListener(img)
    this.canvas.add(img)
  }

  mousedown(pointer: fabric.Point) {
    // 复制图片
    this._loadedIcon.clone(this._onClone.bind(this, pointer))
  }

  destroy():void {
    this._loadedIcon = null
  }
}

export default CorrectingBase