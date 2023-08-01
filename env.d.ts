/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-03-24 16:50:09
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-08-01 20:43:48
 * @FilePath: /correct/env.d.ts
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