## 腾千里笔记复原
解析腾千里数据，并根据数据进行笔记复原

## 使用安装
```
npm install @aixuexi/penCorrectPlayer
```

#### 类型定义
```javascript
// json数据中的元素
type OptionData = {
  force number
  penModel: number
  timelong: number
  type: 'PEN_DOWN' | 'PEN_MOVE'| 'PEN_UP'
  width: number
  x: number
  y: number
}
// 传入的json数据
type JsonDataType = OptionData[]

```
#### 直接展示画笔轨迹
```javascript
import Player from "@aixuexi/penCorrectPlayer"
const canvas = document.getElementById("canvas");
const player = new Player(canvas, {
  jsonData,
});
player.show();
```

#### 播放展示画笔轨迹
```javascript
import Player from "@aixuexi/penCorrectPlayer"
const canvas = document.getElementById("canvas");
const player = new Player(canvas, {
  jsonData,
});
player.play();
```

## 注意
#### @rollup/plugin-url插件小于limit的时候，将svg图片转换成base64的时候会有问题，base64内容无法解析；后期如果出现大的媒体资源，可以尝试将资源上传到cdn（https://github.com/rollup/plugins/pull/173）
