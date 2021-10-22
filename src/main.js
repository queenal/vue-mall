import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.scss'
import router from "./router";
// import 'que-audios/dist/que-audios.css'

// import {VueAudios} from 'vue-audios'
// import { QueAudios } from 'que-audios'
// import { VueAudios } from 'que-audios'
// import 'que-audios'
// import 'vue-audios/dist/vue-audios.css'
import Print from 'vue-print-nb'
import 'xgplayer';

// import 'que-audios/dist/que-audios.css'
// import { QueAudios } from 'que-audios'
// Vue.use(QueAudios)

// Vue.use(VueAudios)
// Vue.use(QueAudios)
Vue.use(Print)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
