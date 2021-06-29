import qingTree from './src/tree.vue'

/* istanbul ignore next */
qingTree.install = function(Vue) {
  Vue.component(qingTree.name, qingTree)
}

export default qingTree
