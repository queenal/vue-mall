import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.scss'
import router from "./router";
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: 'your amap key',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')