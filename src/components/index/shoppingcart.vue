<template>
  <div id="app">
   <div class="hasnone" v-if="infos">
    
     <img src="@/assets/images/shoppingcart/gouwukongtubiao.png" alt="" class="hasimg">
     <div class="cart">
      <p>购物车还没有商品哦~ </p> 
      <mt-button type="default" @click="turnTo('新品推荐')">去逛逛</mt-button>
     </div>
   </div>
   <div >
   </div>
    <div class="blanks"></div>
    <div class="index-item">
      <div class="index-child" v-for="(item,index) in shops" :key="index" @click="turnTo(item.COMMODITYKEYID)">
        <img :src="server+item.MAINIMAGE" alt="出错了">
        <p class="index-title">{{item.NAME}}</p>
        <P class="index-price">
        <span><b>&yen;</b>{{item.PRICE}}</span>
        <span>&yen;{{item.ORIGINALPRICE}}</span>
        </P>
      </div>
    </div>
  </div>
</template>

<script>
let qs = require('qs')
export default {
  data(){
    return {
      server:this.GLOBAL.BASE_URL,
      infos:[],
      shops:[],
      page:1
    }
  },
  methods:{
  turnTo(shopid){
    //跳转到详情页
    if(shopid=='新品推荐'){
       this.$router.push('/kindof/'+shopid)
    }else{
       this.$router.push('/shopdetail/'+shopid)
    }
       
    },
  redirect(){
      if(this.$store.state.phone==""){
        this.$router.push('/login')
      }else{
         this.loading()
         this.pickWeek()
      }

    },
  loading(){
    let data = {
    page:'1',	
    rows:'10',
    uname:this.$store.state.phone,
    UID:this.$store.state.UID
    }
    this.$http.post('/card/select2',qs.stringify(data),{
      headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).then(res=>{
      if(res.data.status==200){
           console.log(res.data)
           this.infos = res.data.data
      }
    })
},
pickWeek(){
  let data = {
	        type:1,
					page:this.page,
					rows:20
        }
        this.$http.post('/commodity/selectBySelect',qs.stringify(data),{
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded'
          }
        }).then(res=>{
           if(res.data.status==200){
           console.log(res.data)
           this.shops = res.data.data
      }
        })
			
			},
  },
  created(){
    this.redirect()
    
  },
  components:{}
}
</script>

<style scoped>
.hasnone{
  position:relative;
  height: 10rem;
}
.cart{
  position: absolute;
  top: 25%;
  left:50%;
}
.hasimg{
 width:25%;
 position: relative;
 left:20%;
 top:2rem;
}
.mint-button{
  background: transparent;
  color:#ff7100;
  border:1px solid #ff7100;
  font-size:13px;
  line-height: 13px;
  position: absolute;
  left: 23%;
  height: 23px;
  top:137%;
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
