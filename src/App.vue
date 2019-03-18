<template>
  <div id="app">
    <mt-header fixed title="5941商城 "></mt-header>
    <router-view/>
        <mt-tabbar fixed v-model="selected" v-show="$route.meta.navShow">
        <mt-tab-item  id="主页">
          <img slot="icon" src="./assets/icon/index.png">
              主页
          </mt-tab-item>
          <!-- <mt-tab-item id="分类">
              <img slot="icon" src="./assets/icon/type.png">
              分类
          </mt-tab-item> -->
          <mt-tab-item  id="购物车">
              <img slot="icon" src="./assets/icon/shoppingcart.png">
              购物车
          </mt-tab-item>
          <mt-tab-item id="我的">
            <img slot="icon" src="./assets/icon/mine.png">
              我的
          </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'App',
    data(){
        return {
             selected:'主页',
        }
    },
    methods:{
    generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
   let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    })
    this.$store.state.UID = uuid
    }
    },
    created(){
      this. generateUUID()
    },
  store,
  watch:{
     selected(val){
       switch(val){
         case '主页':
              this.$router.push('/index')
              break
        // case '分类':
        //       this.$router.push('/type')
        //       break
        case '购物车':
              this.$router.push('/shoppingcart')
              break 
        case '我的':
              this.$router.push('/mine')
              break           
       }
     }
  }
}

</script>

<style>
*{
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top:1.5rem;
  padding-bottom:2rem;
}
.mint-header{
  background: #fafafa;
  color:#26A2FF;
}
.mint-tabbar{
  height:50px;
}
ul,li,ol,p{
    margin:0
}
a{
  list-style: none;
  text-decoration: none;
  color:#000;
}
.blank{
  width:100%;
  height: .5rem;
  margin:1rem 0 0 0; 
  background: #ecebeb;
}
.blanks{
  width:100%;
  height: .5rem;
  background: #ecebeb;
}
</style>
