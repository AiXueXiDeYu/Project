import { createApp } from 'vue'
import App from './App.vue'
import '@/mock/config' // 模拟数据
import { createPinia } from 'pinia'
import { 
    Field,
    Picker,
    Popup,
    Swipe,
    SwipeItem,
    ConfigProvider,
    Tabbar,
    TabbarItem,
    Skeleton
} from 'vant'
import 'vant/lib/index.css'
import './assets/main.css'  // reset 
import 'lib-flexible/flexible'  // 移动端适配就做好了
import router from './router' // 启用路由


const app = createApp(App)
app
    .use(Field)
    .use(Swipe)
    .use(SwipeItem)
    .use(Picker)
    .use(Popup)
    .use(ConfigProvider)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Skeleton)
    .use(router)
    .use(createPinia())
    .mount('#app')
