/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-02-03 12:24:59
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-07-05 17:10:40
 * @FilePath: /jzx-correct-mobile/src/util/EventEmitter.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
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
