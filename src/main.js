import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification';
import ElementPlus  from 'element-plus';
import 'element-plus/dist/index.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import {Icon} from '@iconify/vue';
import Modal from './components/Modal.vue';
// import 'vue-toast-notification/dist/theme-default.css';
const app = createApp(App)

app.component('Icon', Icon);
app.use(ElementPlus);
app.use(ToastPlugin);
app.component('Modal', Modal);
app.mount('#app')
