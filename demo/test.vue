<template>
  <div class="test">demo</div>
  <div class="container" ref="ContainerEle"></div>
  <div class="buttons">
    <template v-for="group in ButtonGroups">
      <a-button v-for="(item, index) in group" :key="`${item.value}_${index}`" @click="onClick(item)"> {{ item.name }}</a-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { CorrectTool, Controls, IconsInCanvas, Zoom } from '@xxx/jzx-correct'

const imageUrl = 'https://img-homework.xxx.com/B:1015:K/1677081600/e53a8172600144d4b2fc9d7821cecb1c.jpg'

const ButtonGroups: any[] = [
  [
    {
      value: Controls.Right,
      name: '对',
      isKeep: true
    },
    {
      value: Controls.NotCompleteRight,
      name: '半对',
      isKeep: true
    },
    {
      value: Controls.Wrong,
      name: '错',
      isKeep: true
    }
  ],
  [
    {
      value: Controls.Text,
      name: '文本',
      isKeep: true
    },
    {
      value: Controls.Circle,
      name: '圈',
      isKeep: true
    },
    {
      value: Controls.WavyLine,
      name: '波浪线',
      isKeep: true
    },
    {
      value: Controls.Seal,
      name: '盖戳',
      items: [
        {
          name: '待批改',
          type: IconsInCanvas.UncorrectOfSeal
        },
        {
          name: '完美',
          type: IconsInCanvas.PerfectOfSeal
        },
        {
          name: '加油',
          type: IconsInCanvas.EncourageOfSeal
        },
        {
          name: '优秀',
          type: IconsInCanvas.ExcellentOfSeal
        }
      ]
    }
  ],
  [
    {
      value: Controls.Zoom,
      type: Zoom.In,
      name: '放大'
    },
    {
      value: Controls.Zoom,
      type: Zoom.Out,
      name: '缩小'
    }
  ],
  [
    {
      value: Controls.Rotate,
      name: '旋转'
    }
  ],
  [
    {
      value: Controls.Clean,
      name: '清空'
    }
  ]
]
const ContainerEle = ref(null)
let correct: CorrectTool

// methods
function onClick(button: any): void {
  let param = null
  const actionTypeInfo: any = {
    actionType: button.value,
    isKeep: false
  }
  if (button.type) {
    param = { type: button.type }
  }
  param && (actionTypeInfo.params = param)
  // button
  correct.setCurActionTypeInfo(actionTypeInfo)
}

onMounted(() => {
  correct = new CorrectTool({
    container: ContainerEle.value,
    imageUrl: imageUrl
  })
})
</script>

<style lang="less" scoped>
.test {
}

.container {
  background-color: red;
  width: 500px;
  height: 300px;
}
</style>
