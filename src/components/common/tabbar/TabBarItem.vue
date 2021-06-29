<template>
  <div class="tab-bar-item" @click="changePath">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-activeIcon"></slot></div>
<!--    <div :class = "{itemText :isActive}"><slot name="item-text"></slot></div>-->
    <div :style="textColor"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
export default {
  name: "tabBarItem",
  data(){
    return{
    }
  },
  props:{
    path:{
      type: String
    },
    activeColor:{
      type: String
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    textColor(){
      return this.isActive? {color:this.activeColor} : {}
    }
  },
  methods:{
    changePath(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped lang="scss">
.tab-bar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
  img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    // 去除img自带间距
    vertical-align: center;
    margin-bottom: 2px;
  }
}

</style>
