<template>
  <div id="home">
    <div class="home-bar">
      <nav-bar>
        <div slot="center">购物街</div>
      </nav-bar>
    </div>
    <qing-tree :data="data" :props="defaultProps" show-checkbox @node-click="handleNodeClick"></qing-tree>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {getMultiData} from '../../network/home'
import QingTree from '../../components/qingtree/src/tree'

export default {
  name: "home",
  data(){
    return{
      banners:[],
      recommends:[],
      data: [{
        label: '一级 1',
        parentId: null,
        id: 1,
        children: [{
          label: '二级 1-1',
          parentId: 1,
          id: 2,
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        parentId: 1,
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        parentId: 1,
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      input: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  components:{
    NavBar,
    QingTree
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  },
  created() {
    getMultiData().then(res=>{
      console.log(res)
      const result = JSON.stringify(res)
      console.log(result)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
}
</script>

<style scoped lang="scss">
.home-bar{
  background-color: #FF99A0;
  color: #FFFFFF;
  text-align: center;
}
</style>
