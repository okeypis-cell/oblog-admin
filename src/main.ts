import { createApp } from 'vue'

import App from './App.vue'
import Router from './router/index'
import pinia from '@/store'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

import 'animate.css'
import 'animate.css/animate.compat.css'
import '@/style/index.scss'

import '@/utils/permission'

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

const app = createApp(App)

app.config.globalProperties.$config = {}
app.use(Router).use(pinia).use(VueMarkdownEditor).mount('#app')
