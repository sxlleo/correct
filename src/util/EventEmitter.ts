/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-02-03 12:24:59
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-05 17:10:40
 * @FilePath: /correct-mobile/src/util/EventEmitter.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
import mitt from 'mitt'
class EventEmitter {
  constructor() {
    Object.assign(this, mitt())
  }
  emit(...args: any[]): void {
    this.emit(...args)
  }
  on(...args: any[]): void {
    this.on(...args)
  }
}

export default EventEmitter
