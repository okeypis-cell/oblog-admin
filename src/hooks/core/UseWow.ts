import { onMounted } from 'vue'
import WOW from 'wow.js'
// 初始化wowjs
export function useWow() {
  onMounted(() => {
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 30, // 触发动画时到元素的距离(默认为0)
      mobile: true, // 在移动设备上触发动画(默认为true)
      live: true, // 操作异步加载的内容(默认为true)
      scrollContainer: null, // 可选滚动容器选择器，否则使用window
      resetAnimation: true // 重置动画结束
    })
    wow.init()
  })
}
