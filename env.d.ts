/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-03-24 16:50:09
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-10 15:29:35
 * @FilePath: /correct-mobile/env.d.ts
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */
/// <reference types="fabric" />

// import type CanvasWithImage from '@/correct/CanvasWithImage'

export {}

declare module 'fabric' {
  namespace fabric {
    interface Object {
      __actionType: number
      __externalParams: Record<string | number, any>
    }
    interface IText {
      updateTextareaPosition(): void
    }
    interface IUtil {
      getBisector(a: any, b: any, c: any): any
    }
  }
}