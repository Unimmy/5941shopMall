<template>
    <div id="kindof">
        <mt-header fixed :title="mk">
        <div slot="left">
            <mt-button  icon="back" @click="$router.back(-1)"></mt-button>
        </div>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>
        <div  class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"  :autoFill="isAutoFill">  
            <swipe :dataBanner="path"></swipe>
            <div class="index-item">
            <div class="index-child" v-for="(item,index) in infos" :key="index" @click="turnTo(item.COMMODITYKEYID)">
                <img :src="server+item.MAINIMAGE" alt="出错了">
                <p class="index-title">{{item.NAME}}</p>
                <P class="index-price">
                <span><b>&yen;</b>{{item.PRICE}}</span>
                <span>&yen;{{item.ORIGINALPRICE}}</span>
                </P>
            </div>
            </div>
            </mt-loadmore>

        </div>
    </div>
</template>

<script>
const qs =require('qs')
import swipe from '@/components/common/swipe.vue'
import { Loadmore } from 'mint-ui';
export default {
    data(){
        return {
            server:this.GLOBAL.BASE_URL,
            mk:'',//mk
            rows:'10',
            page:'1',
            path:'',
            infos:[],
            //可以进行上拉
            allLoaded:false,
            //是否自动触发上拉函数
            isAutoFill:false,
            wrapperHeight:0
        }
    },
    methods:{
        turnTo(shopid){
        //跳转到详情页
            this.$router.push('/shopdetail/'+shopid)
        },
        getSearch(){
         this.mk = this.$route.params.mk
        },
        getBanner(){
           let data = {
               key:'3',
               describe:this.mk
            
           }
           this.$http.post(' /Advertisement/select',qs.stringify(data),{
               headers:{
                   'Content-Type':'application/x-www-form-urlencoded'
               }
           }).then(res=>{
               if(res.data.status==200){
                   this.path = res.data.data
               }
           })
        },
        getInfos(){
            let data ={
              	type:1,
                indexs:this.mk,
                page:this.page,
                rows:this.rows
            }
            this.$http.post('/commodity/selectBySelect',qs.stringify(data),{
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then(res=>{
                this.infos = res.data.data
                }
            )
        },
        //上拉加载
        loadTop() {
            this.page = 1 
            this.getInfos()
             this.allLoaded = false
            this.$refs.loadmore.onTopLoaded()
        },
        //下拉刷新
        loadBottom() {
            this.page++ 
             let data ={
              	type:1,
                indexs:this.mk,
                page:this.page,
                rows:this.rows
            }
            this.$http.post('/commodity/selectBySelect',qs.stringify(data),{
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then(res=>{
                this.infos =  this.infos.concat( res.data.data)
                 if(res.data.data.length<1){
                     // 若数据已全部获取完毕
                    this.allLoaded = true
                    this.$refs.loadmore.onBottomLoaded()
                }
            }
            )
        }
    },
    created(){
       this.getSearch()
       this. getInfos()
       this.getBanner()
    },
    mounted(){
      this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    },
    components:{swipe}
}
</script>

<style scoped>
.main-body {
  /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
  overflow: scroll;
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
