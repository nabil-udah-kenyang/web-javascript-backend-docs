import DefaultTheme from 'vitepress/theme'
import CheckpointChecklist from './CheckpointChecklist.vue'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('CheckpointChecklist', CheckpointChecklist)
  }
}
