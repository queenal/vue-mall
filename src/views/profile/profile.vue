<template>
  <div class="app-container">
<!--    <div style="display: flex;flex-direction: row">-->
      <category :num="1"></category>
      <category :num="2"></category>
      <category :num="3"></category>
      <category :num="4"></category>
      <category :num="5"></category>
      <category :num="6"></category>
      <category :num="7"></category>
      <category :num="8"></category>
      <category :num="9"></category>
      <category :num="10"></category>
<!--    </div>-->


<!--      <swiper class="swiper" ref="mySwiper" :options="swiperOption">-->
<!--        <swiper-slide><div><category></category></div></swiper-slide>-->
<!--        <swiper-slide><div><category></category></div></swiper-slide>-->
<!--        <swiper-slide><div><category></category></div></swiper-slide>-->
<!--        <swiper-slide><category></category></swiper-slide>-->
<!--        <swiper-slide><category></category></swiper-slide>-->
<!--        <swiper-slide><category></category></swiper-slide>-->
<!--        <swiper-slide><div><category :num="1"></category></div></swiper-slide>-->
<!--        <swiper-slide><div><category :num="2"></category></div></swiper-slide>-->
<!--        <swiper-slide><div><category :num="3"></category></div></swiper-slide>-->
<!--        <swiper-slide><div><category :num="4"></category></div></swiper-slide>-->
<!--        <swiper-slide>Slide 8</swiper-slide>-->
<!--        <swiper-slide>Slide 9</swiper-slide>-->
<!--        <swiper-slide>Slide 10</swiper-slide>-->
<!--        <div class="swiper-pagination" slot="pagination"></div>-->
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
<!--      </swiper>-->
  </div>
</template>

<script>
// import 'swiper/swiper-bundle.min.css'
import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import category from "../category/category";
// import $ from "jquery";

export default {
  name: "profile",
  components: {
    // swiper,
    // swiperSlide,
    category
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  mounted() {
    // $('.app-container').scroll(() => {
      // console.log("滚动条移动")
      // if (this.oWebControl != null) {
      //   this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight);
      //   this.setWndCover();
      // }
    // });
  },
  methods: {
  }
}
</script>

<style scoped>
.swiper{
  height:300px;
}
.swiper-slide{
  border:1px solid red;
}
.app-container{
  overflow: scroll;
  height:220px;
  max-width:1000px;
}

</style>
