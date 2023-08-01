/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-01-31 17:12:57
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-04-06 11:11:59
 * @FilePath: /jzx-correct/src/correct/DefinedEvents/index.ts
 * @Description:
 * Copyright (c) 2023 by songxiaolin email: songxiaolin@aixuexi.com, All Rights Reserved.
 */
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
  UPDATE_CONTROLLER_BTN: 'update_controller_btn'
}
