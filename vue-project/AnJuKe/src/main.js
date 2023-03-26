import { createApp } from 'vue'
import App from './App.vue'
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
    Skeleton,
    Icon,
    CellGroup,
    Form,
    Button,
    ShareSheet,
    Cell,
    Search,
    ActionBarIcon
} from 'vant'
import router from './router' // 启用路由
import '@/mock/config' // 模拟数据
import 'vant/lib/index.css'
import './assets/main.css'  // reset 
import 'lib-flexible/flexible'  // 移动端适配就做好了



const app = createApp(App)
app
    .use(Field)
    .use(Swipe)
    .use(SwipeItem)
    .use(Picker)
    .use(Popup)
    .use(ConfigProvider)
    .use(Tabbar)
    .use(Icon)
    .use(Cell)
    .use(TabbarItem)
    .use(CellGroup)
    .use(Form)
    .use(Button)
    .use(Skeleton)
    .use(Search)
    .use(ShareSheet)
    .use(ActionBarIcon)
    .use(router)
    .use(createPinia())
    .mount('#app')
