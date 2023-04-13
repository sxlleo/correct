/// <reference types="fabric" />

import type CanvasWithImage from "@/correct/CanvasWithImage"

export {}

declare module 'fabric' {
  namespace fabric {
    interface Object {
      __actionType: number
    }
    interface IText {
      updateTextareaPosition():void
    }
    interface IUtil {
      getBisector(a: any, b: any, c: any): any
    }
  }
}