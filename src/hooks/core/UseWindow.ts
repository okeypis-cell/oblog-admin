import { useMessage } from 'naive-ui'

export function useWindow() {
  onMounted(() => {
    if (!window.$message) {
      window.$message = useMessage()
    }
  })
}
