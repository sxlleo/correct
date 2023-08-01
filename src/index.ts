/*
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-03-23 18:18:55
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-04-03 13:55:31
 * @FilePath: /jzx-correct/src/index.ts
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */
export { default as DefinedEvents } from './correct/DefinedEvents/index'
export { default as EventEmitter } from './util/EventEmitter'

export { default as CorrectTool } from './correct/CorrectTool'

export { preloadIcon, loadImage, iconsLoaded } from './util/index'
export { Controls, IconsInCanvas, Zoom } from './interface/ICorrectTool'