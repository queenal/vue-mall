<template>
  <div id="app">
    <router-view></router-view>
  <tab-bar>
    <tab-bar-item v-for="(item,index) in tabBarContent"
                  :key="index + item.text"
                  :path = item.path
                  :activeColor = "item.color"
                  >
      <img slot="item-icon" :src=item.icon alt=""/>
      <img slot="item-activeIcon" :src=item.activeIcon alt=""/>
      <div slot="item-text">{{item.text}}</div>
    </tab-bar-item>
  </tab-bar>
  </div>
</template>

<script>
import TabBar from "./components/common/tabbar/TabBar";
import TabBarItem from "./components/common/tabbar/TabBarItem";
export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem
  },
  data(){
    return{
      tabBarContent: [
        {
          activeIcon:require('./assets/img/tabbar/home_active.svg'),
          icon:require('./assets/img/tabbar/home.svg'),
          text:'首页',
          path: '/home',
          color:'#FF4474'
        },
        {
          activeIcon:require('./assets/img/tabbar/category_active.svg'),
          icon:require('./assets/img/tabbar/category.svg'),
          text:'分类',
          path: '/category',
          color:'#FF4474'
        },
        {
          activeIcon:require('./assets/img/tabbar/shopcart_active.svg'),
          icon:require('./assets/img/tabbar/shopcart.svg'),
          text:'购物车',
          path: '/cart',
          color:'#FF4474'
        },
        {
          activeIcon:require('./assets/img/tabbar/profile_active.svg'),
          icon:require('./assets/img/tabbar/profile.svg'),
          text:'个人',
          path: '/profile',
          color:'#FF4474'
        }
      ]
    }
  },
  methods:{
  },
  computed:{
  }
}
</script>

<style scoped lang="scss">
#app {
}
</style>
