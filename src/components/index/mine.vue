<template>
  <div id="app">
    <div class="headpic">
      <img src="../../assets/icon/headpic.png" alt="出错了..." class="headerpic" v-if="this.$store.state.headpic==''">
      <img :src="server+this.$store.state.headpic" alt="出错了..." class="headerpic"  v-if="this.$store.state.headpic!=''">
      <p class="usertitle" v-if="this.$store.state.headpic==''">请设置名称</p>
       <p class="usertitle" v-if="this.$store.state.headpic!=''">{{$store.state.nickname}}</p>
    </div>
    <div class="blanks"></div>
    <mt-cell title="我的订单" is-link></mt-cell>
    <hr style="width:95%;color:#ccc; margin:0 auto">
    <div class="icon-box">
        <div class="box-item">
          <img src="../../assets/icon/mine/daizhifu.png" alt="">  
          <p>待支付</p>
        </div>    
         <div class="box-item">
          <img src="../../assets/icon/mine/daifahuo.png" alt="">  
          <p>代发货</p>
        </div>     
         <div class="box-item">
          <img src="../../assets/icon/mine/daishouhuo.png" alt="">  
            <p>待收货</p>
        </div>     
         <div class="box-item">
          <img src="../../assets/icon/mine/yiwancheng.png" alt="">  
            <p>已完成</p>
        </div>     
         <div class="box-item">
          <img src="../../assets/icon/mine/tuihuanhuo.png" alt="">  
            <p>退换货</p>
        </div>      
    </div>
    <div class="blanks"></div>

     <div class="blanks"></div>
    <mt-cell title="我的服务"></mt-cell>
    <hr style="width:95%;color:#ccc; margin:0 auto">
    <div class="icon-box">
        <div class="box-item">
          <img src="../../assets/icon/mine/wodedizhi.png" alt="">  
          <p>我的地址</p>
        </div>   
    </div>
    <div class="blanks"></div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
      server:this.GLOBAL.BASE_URL,
      }
    },
    methods:{
     redirect(){
       if(this.$store.state.phone==""){
         this.$router.push('/login')
       }
     }
    },
    created(){
      this.redirect()
    },
    components:{}
  }
</script>

<style scoped>
.headpic{
  width:100%;
  /* text-align: center; */
  height: 7rem;
  background: linear-gradient(to right,#ff5930ce,#ff5930);
  line-height: 4rem;
  padding-top:2rem;
  position: relative;
}
.headerpic{
  width: 14%;
  border:2px solid rgba(255,255,255, .3);
  border-radius:50%;
  margin-left: 1rem;
}
.usertitle{
  position: absolute;
  top:1rem;
  color:aliceblue;
  font-size: 22px;
  font-weight: bold;  
  left:6rem;
}
.icon-box{
  display:flex;
  padding-top: .5rem;
}
.box-item img{
  width:40%;
}
.box-item {
  width:20%;
  text-align: center;
  margin:0.2rem;
}
</style>
