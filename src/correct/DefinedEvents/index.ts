/*
 * @Author: songxiaolin sxldongman@163.com
 * @Date: 2023-01-31 17:12:57
 * @LastEditors: songxiaolin sxldongman@163.com
 * @LastEditTime: 2023-07-11 16:08:43
 * @FilePath: /correct-mobile/src/correct/DefinedEvents/index.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: sxldongman@163.com, All Rights Reserved.
 */
// todo: 事件定义可以进行分类
export default {
  // 触发开启工具
  TRIGGER_TOOL: 'trigger_tool',
  // 创建对象（这个事件在两个场景复用）
  CREATE_OBJ: 'create_obj',
  // 删除对象（这个事件在两个场景复用）
  DELETE_OBJ: 'delete_obj',
  // 舞台上的对象类型发生变化
  OBJECT_TYPE_IN_CANVAS_CHANGE: 'object_type_in_canvas_change',
  // 选中批改工具操作按钮
  UPDATE_CONTROLLER_BTN: 'update_controller_btn',
  // 保存快照
  SAVE_SNAPSHOT: 'save_snapshot',
  // canvas图片加载完成
  CANVAS_IMAGE_LOADED: 'canvas_image_loaded',
  // 编辑文本开始事件
  EDITING_ENTERED: 'editing_entered',
  // 编辑文本退出事件
  EDITING_EXITED: 'editing_exited',
  // 批改工具准备成功
  READY: 'correct_tool_ready',
  // 单指开始
  PAN_START: 'pan_start',
  // 单指移动
  PAN_MOVE: 'pan_move',
  // 单指结束
  PAN_END: 'pan_end',
  // 触摸
  TOUCH: 'touch',
}
