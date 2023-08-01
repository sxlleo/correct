<!--
 * @Author: songxiaolin songxiaolin@xxx.com
 * @Date: 2023-03-24 16:44:16
 * @LastEditors: songxiaolin songxiaolin@xxx.com
 * @LastEditTime: 2023-07-11 18:22:11
 * @FilePath: /jzx-correct/README.md
 * @Description: 
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
-->
## 批改工具
基于fabric封装的批改工具，包含批改正误、印章、放大、缩小、旋转等功能

## 使用安装
```
npm install @xxx/jzx-correct
```

## 注意1
#### @rollup/plugin-url插件小于limit的时候，将svg图片转换成base64的时候会有问题，base64内容无法解析；后期如果出现大的媒体资源，可以尝试将资源上传到cdn（https://github.com/rollup/plugins/pull/173）

## 注意2
#### 发包流程
1、先修改package.json里面的版本号；
2、再执行npm run build
3、再提交代码，并打tag；
4、yarn publish进行发布包
#### 切记，需要先更新版本号，再进行打包，因为需要把版本号打包进生产环境代码；