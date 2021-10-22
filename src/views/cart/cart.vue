<template>
  <div>
<!--    <vue-audios class="audio" :duration="audioDuration" :url="audioUrl" ></vue-audios>-->
    <que-audio class="audio" :duration="audioDuration" :url="audioUrl" ></que-audio>
    <div id="printTest">
      <p>明月照于山间</p>
      <p>清风来于江上 </p>
    </div>
    <button v-print="'#printTest'">打印</button>
    <div id="xg" class="width:500px;height:500px;"></div>
  </div>
</template>

<script>
import FlvPlayer from 'xgplayer-flv';
export default {
  name: "cart",
  data(){
    return{
      audioUrl: 'http://192.168.1.61:9000/zhjttest/yjsjssgz/14802.mp3',
      audioDuration: 15,
      player: null
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
        this.player = new FlvPlayer({
        id: 'xg',
        url: 'https://file.njshushuo.com/8d2164883f65d1f78180b3fcc159d282 ',
        videoInit: true, // 显示首帧
        lang: 'zh-cn',
        // fluid: true,
        autoplay: false,
        screenShot: true,
        isLive: true,
        preloadTime: 30,
        minCachedTime: 5,
        cors: true
      })
      this.player.on('play', () => {
        console.log('正在播放')
      })
    }
  }
}
</script>

<style scoped>

</style>
