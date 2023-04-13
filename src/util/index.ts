import { fabric } from 'fabric'

type IconMapBeforeLoad = {
  [key: string | number]: string
}
type IconMapAfterLoad = {
  [key: string]: fabric.Image
}

function loadImage(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      url,
      (img: fabric.Image, isError?: any) => {
        if (isError) {
          reject(isError)
        } else {
          resolve(img)
        }
      },
      { crossOrigin: 'anonymous' }
    )
  })
}

// 加载完成的图标
const iconsLoaded = {}
// todo: 后期可以兼容进度、完成、错误的回调
async function preloadIcon(iconMapBeforeLoad: IconMapBeforeLoad): Promise<any> {
  const loadQueen = []
  const iconArr = Object.entries(iconMapBeforeLoad)
  // const
  for (const [iconName, iconUrl] of iconArr) {
    if (!iconsLoaded[iconName]) {
      loadQueen.push(
        loadImage(iconUrl)
          .then((img) => {
            iconsLoaded[iconName] = img
          })
          .catch((err) => {
            throw new Error(err)
          })
      )
    }
  }

  console.log('preload', loadQueen)
  // 都加载过了，也成功
  if (loadQueen.length === 0) return Promise.resolve({ success: true })

  return Promise.all(loadQueen)
    .then((res) => {
      // 成功
      return {
        success: true
      }
    })
    .catch((err) => {
      // 失败
      return {
        success: false
      }
    })
}

export { preloadIcon, loadImage, iconsLoaded }
