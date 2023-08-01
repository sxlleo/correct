/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-03-24 16:50:09
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-04-04 12:13:54
 * @FilePath: /jzx-correct/env.d.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */
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