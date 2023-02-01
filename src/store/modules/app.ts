import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
import { TAGS_VIEW } from '@/constants'

import type { AdminTagsView } from '../types/admin'

interface AppStoreState {
  tagsViewList: Array<AdminTagsView>
}
interface AdminRemoveTagsPayload {
  index: number
  type: string
}

export default defineStore('App', {
  state(): AppStoreState {
    return {
      tagsViewList: <Array<AdminTagsView>>getItem(TAGS_VIEW) || []
    }
  },
  actions: {
    /**
     * 添加TagsView
     */
    addTagsViewList(tag: AdminTagsView) {
      // 处理重复
      const isFind = this.tagsViewList.find((item: AdminTagsView) => {
        return item.path === tag.path
      })
      if (!isFind) {
        this.tagsViewList.push(tag)
        setItem(TAGS_VIEW, this.tagsViewList)
      }
    },
    removeTagsView(payload: AdminRemoveTagsPayload) {
      if (payload.type === 'index') {
        this.tagsViewList.splice(payload.index, 1)
      }
      setItem(TAGS_VIEW, this.tagsViewList)
    }
  },
  getters: {}
})
