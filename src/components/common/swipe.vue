<template>
  <div id="swiper">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in dataBanner" :key="index">
        <img :src="server+item.path" alt="错误" v-if="item.path!=undefined">
        <img :src="server+item" alt="错误" v-if="item.path==undefined">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    name:'swipe',
    data(){
      return {
      server: this.GLOBAL.BASE_URL
      }
    },
    methods:{},
    created(){
    },
    props:['dataBanner']
  }
</script>

<style>
.mint-swipe{
    height:10rem;
}
.mint-swipe img{
  width:100%;
}
#swiper{
  padding-top: 1rem;
}
</style>
