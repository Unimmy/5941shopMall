<template>
  <div id="app">
  <mt-navbar v-model="selected">
    <mt-tab-item :id="item.LARGECLASS" v-for="(item,index) in infos.TYPE" :key="index">{{item.LARGECLASS}}</mt-tab-item>
  </mt-navbar>
     <swipe :dataBanner="infos.TOP"></swipe>
  <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="item.LARGECLASS" v-for="(item,index) in infos.TYPE" :key="index">
          <div  v-if="selected=='推荐'">
            <div class="index" v-for="(item,index) in infos.COMMODITY" :key="index">
              <mt-cell :title="item.mk" is-link :to="'/kindof/'+item.mk"></mt-cell>
                <div class="index-item">
                  <div class="index-child" v-for="(item,index) in item.listmap" :key="index" @click="turnTo(item.COMMODITYKEYID)">
                    <img :src="server+item.MAINIMAGE" alt="出错了">
                    <p class="index-title">{{item.NAME}}</p>
                     <P class="index-price">
                        <span><b>&yen;</b>{{item.PRICE}}</span>
                       <span>&yen;{{item.ORIGINALPRICE}}</span>
                     </P>
                  </div>
                </div>
            </div>
          </div>
          <div v-if="selected!='推荐'">
            <div class="index" v-for="(item,index) in typeInfos" :key="index" >
              <mt-cell :title="item.mk" is-link :to="'/kindof/'+item.mk"></mt-cell>
                <div class="index-item">
                  <div class="index-child" v-for="(item,index) in item.listmap" :key="index" @click="turnTo(item.COMMODITYKEYID)">
                    <img :src="server+item.MAINIMAGE" alt="出错了">
                      <p class="index-title">{{item.NAME}}</p>
                     <P class="index-price">
                       <span><b>&yen;</b>{{item.PRICE}}</span>
                       <span>&yen;{{item.ORIGINALPRICE}}</span>
                     </P>
                  </div>
                </div>
            </div>
          </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  const qs = require('qs')
  import swipe from '../common/swipe.vue'
  export default {
    data(){
      return {
        indexselected:'主页',
        server:this.GLOBAL.BASE_URL,
        selected:'推荐',
        infos:[], //所有数据
        typeInfos:[],//分类信息
        sendInfo:{
          page:1, //分页信息
        } 
      }
    },
    methods:{
      getInfos(){
        //获取首页数据
        let data = {mk:'mk'}
        this.$http.post('/index',qs.stringify(data),{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res=>{
          this.infos = res.data.data
          // console.log(res.data.data)
        })
      },
      turnTo(shopid){
        //跳转到详情页
        this.$router.push('/shopdetail/'+shopid)
      },
    },
    created(){
    this.getInfos()
    // console.log(this.$store)
    },
    components:{swipe},
    watch:{
        selected(){
          //监控nvabar的改变获取后台数据
          let data = {
						largeclass:this.selected,
						type:1,
						mk:'mk',
						rows:'10',
						page:this.sendInfo.page
					}
         this.$http.post('/commodity/selectBySelect',qs.stringify(data),{
					 headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
					}).then(res=>{
            this.typeInfos = res.data.data
            console.log(res.data.data)
          })
        }
    }
  }
</script>

<style scoped>
.mint-swipe{
  height: 10rem !important;
}
.mt-cell-item{
  height: 300px;
}
.index-item{
  display: flex;
  flex-wrap: wrap;
  padding-bottom:1rem;
}
.index-child{
  width:45%;
  height: 227.55px;
  /* border:1px solid #ccc; */
  margin-top:1rem;
  margin-left:.5rem;
}
.index-child:nth-child(even){
  margin-left:1rem; 
}
.index-child img{
  width:100%;
}
.index-title{
  width: 100%;
  height: 45px;
  margin:0;
  overflow: hidden;
  text-overflow:ellipsis;
  /* white-space: wrap; */
}
.index-price{
  margin:0
  }
.index-price span:first-child{
  color:red;
  font-weight: bold;

}
.index-price span:last-child{
  text-decoration: line-through;
  font-size:13px;
}
</style>
