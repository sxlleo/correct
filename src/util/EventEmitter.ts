/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-02-03 12:24:59
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-03-23 18:24:16
 * @FilePath: /jzx-teacher-h5/src/views/evaluation/correctsManager/core/util/EventEmitter.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@xxx.com, All Rights Reserved.
 */
import mitt from 'mitt'
class EventEmitter {
  constructor() {
    Object.assign(this, mitt())
  }
}

export default EventEmitter
