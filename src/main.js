import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import echarts from 'echarts'

const app = createApp(App)
app.use(ElementPlus).use(router).mount('#app')
app.config.globalProperties.$echarts = echarts