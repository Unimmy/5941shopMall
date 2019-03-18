<template>
    <div id="details">
    <mt-header fixed title="商品详情">
    <div slot="left">
        <mt-button  icon="back" @click="$router.back(-1)"></mt-button>
    </div>
     <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in infos.mainimage" :key="index">
                <img :src="server+item.path" alt="错误" v-if="item.path!=undefined">
                <img :src="server+item" alt="错误" v-if="item.path==undefined">
            </mt-swipe-item>
        </mt-swipe>

        <div class="title" v-for="(item,index) in infos.commodity" :key="index" >
            <p class="title-one">{{item.NAME}}</p>
            <p class="title-price">&yen;{{infos.num.MINPRICE}}-&yen;{{infos.num.MAXPRICE}}</p>
            <p class="title-item">
                <span class="title-item-cell">已售{{item.SALESIZE}}&nbsp;&nbsp;库存{{infos.num.NUM}}份</span>
            </p>
        </div>
        <div class="blank"></div>
        <div class="chooseType">
           <p>已选 
               <input type="text" placeholder="请选择颜色 型号 分类" disabled class="chooseTitle" v-model="shopdetails">
            </p> 
           <p>颜色分类</p>
           <p>
             <span class="brand" v-for="(item,index) in infos.colour" :key="index" @click="chooseColor(index,item.colour,1)"  :class="index==colorIndex&&colorName!=''?'active':''">{{item.colour}}</span>
          </p>
           <p>尺码</p>
           <p><span class="brand" v-for="(item,index) in infos.mysize" :key="index"  @click="chooseSize(index,item.mysize,2)"  :class="index==sizeIndex&&sizeName!=''?'active':''">{{item.mysize}}</span></p>
           <p>数量</p>
           <p class="sendInfoArray">
              <mt-button type="default"  size="small" @click="rednum()">-</mt-button>
              <input type="text" v-model="sendInfo.num" class="num" maxlength="3"> 
              <mt-button type="default"  size="small" @click="addnum()">+</mt-button>
           </p>
        </div>
        <div class="blank"></div>
        <div class="modityImg">
            <p v-for="(item,index) in infos.detailsimage" :key="index">
                <img  v-lazy="server+item"  alt="错误" width="100%"/>
            </p>
        </div>
      <div class="fixedbar">
          <p @click="alertDiv()">
             <img slot="icon" src="../../../assets/icon/chat.png"   width="40%" >
          </p>
          <p class="badge">   
            <mt-badge type="error"><span style="position:relative;top:-5px;">{{infos.ShoppingCard}}</span></mt-badge>
            <img slot="icon" src="../../../assets/icon/gouwuche.png" width="36%" > 
          </p>
          <div class="payArray">
            <button >立刻购买</button>
            <button style="background:#ff5930;color:#ffffff;" @click="addCar()">加入购物车</button>
          </div>
      </div>
    </div>
</template>

<script>
let qs = require('qs')
import store from '@/store/store.js'
import { MessageBox } from 'mint-ui'
export default {
 data(){
    return {
        server:this.GLOBAL.BASE_URL,
        shopid:'',//商品id
        infos:[], //商品信息
        shopdetails:'',
        sendInfo:{
            color:'',
            size:'',
            num:'1'
        },
        colorIndex:'',
        colorName:'',
        sizeIndex:'',
        sizeName:'',
    }
 },
 store,
 methods:{
     //获取路由传参
     getUrlStr(){
         let shopid = this.$route.params.shopid
         this.shopid = shopid
     },
     //获取商品详情
    getInfos(){
        let data = {
            name:this.shopid
        }
        this.$http.post('/commodity/selectInfoByname',qs.stringify(data),{
            headers:{
                  'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            if(res.data.status == 200){
                //   console.log(res.data.data)
                  this.infos = res.data.data
            }
        })
    },
    //改变sendInfo中num的值
    rednum(){
        if(this.sendInfo.color!=''&&this.sendInfo.size!='') {
            if( this.sendInfo.num<=1){
                this.sendInfo.num = 1
            }else{
                this.sendInfo.num--
            }
             this.shopdetails =  this.sendInfo.color+this.sendInfo.size+'x'+this.sendInfo.num
        } 
       
    },
    addnum(){
          if(this.sendInfo.color!=''&&this.sendInfo.size!='') {
             this.sendInfo.num++
             this.shopdetails =  this.sendInfo.color+this.sendInfo.size+'x'+this.sendInfo.num
        } 
    },
    // 弹出电话号码
    alertDiv(){
        let data = {
            uname:this.$store.state.phone,
            UID:this.$store.state.UID
        }
        // console.log(data)
        this.$http.post('/member/selectClerkPhone',qs.stringify(data),{
            headers:{
                  'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            console.log(res.data)
            if(res.data.status==200){
              MessageBox.confirm(res.data.data,'客服电话').then(action=>{
                window.location.href="tel:"+res.data.data
                ;	//拨打电话
                }).catch(error=>console.log(error))
            }else{
                MessageBox.confirm('还未登录请登录后使用','系统提示').then(action=>{
                 this.$router.push('/login')
                }).catch(error=>console.log(error))
            }
        })
    },
    //选择颜色
    chooseColor(index,name,type){
        this.colorIndex = index
        this.colorName = name
        this.sendInfo.color = name
        this.shopdetails =  this.sendInfo.color+this.sendInfo.size+'x'+this.sendInfo.num
        let data = {
            keyid:this. shopid,
            str:name,
            type:type
        }
        this.$http.post('/commodity/coloursize',qs.stringify(data),{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            console.log(res.data)
        })
    },
    //选择尺寸
    chooseSize(index,name,type){
        this.sizeIndex = index
        this.sizeName = name
        this.sendInfo.size = name
        this.shopdetails =  this.sendInfo.color+this.sendInfo.size+'x'+this.sendInfo.num
          let data = {
            keyid:this. shopid,
            str:name,
            type:type
        }
        this.$http.post('/commodity/coloursize',qs.stringify(data),{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            console.log(res.data)
        })
    },
    //加入购物车
    	addCar:function(){
            if(this.$store.state.phone==''||this.$store.state.phone==undefined){
                 MessageBox.confirm('还未登录请登录后使用','系统提示').then(action=>{
                 this.$router.push('/login')
                }).catch(error=>console.log(error))
            }else{
                if(true){
                 MessageBox.confirm('请选择商品类型','系统提示')
                }else{
                 
                }
            }
			},
 },
 created(){
   this.getUrlStr()
   this.getInfos()
// console.log(this.$store.state)
 },
 filters:{
     stringobj(val){
         return vbl.toString()
     }
 }
}
</script>

<style scoped>
.mint-badge{
    position: absolute;
    top:0rem;
    right:0rem;
    width:.5rem;
    height: .5rem;
    border-radius: 100%;
    font-size:.3rem;
    padding-top:.5rem;
    background: #ff5930;
}
.badge{
    position: relative;
}
.active{
    color:#ff5930 !important;
    border:1px solid #ff5930  !important;
}
img[lazy=loading] {
  height: 100px;
  margin: auto;
  background: url("../../../assets/images/lazyload.jpg") no-repeat fixed center;
}
.payArray {
    width:50%;
    display:flex;
}
.payArray button{
    width:50%;
    border:none;
    padding:0;
    margin:0;
}
.fixedbar{
    position:fixed;
    bottom:0;
    display:flex;
    background: #ffffff;
    height: 2.5rem;
    border-top:1px solid #ccc;
    width:100%;
}
.fixedbar p{
    width:25%;
    border-right:1px solid #ccc;
    text-align: center;
    padding-top:.2rem;
}
#details{
     padding-top:1rem;
}
.mint-swipe{
    height:20.5rem;
}
.title{
    position:relative;
    height: 76px;
    top:5px;
    font-weight: bold;
    padding: 1rem;
}
.title-price{
    font-size: 16px;
    color:red;
    position: absolute;
    bottom:0;
}
.title-item{
    position: absolute;
    right:1rem;
    bottom:0;
}

.title-item-cell{
    color:#7d7d7d;
}
.chooseTitle{
    border:0px;
    outline: none;
    background: #fff;
}
.chooseType{
    padding:.5rem;
}
.chooseType p{
    margin:.5rem;
}
.brand{
    border:1px solid #7d7d7d;
    color:#7d7d7d;
    display: inline-block;
    padding:0.4rem;
    margin:.3rem;
    border-radius: .3rem;
}
.num{
    text-align: center;
    width: 2rem;
    border:0;
    outline:none;
}
.sendInfoArray{
    border:1px solid #ccc;
    width:6.4rem;
    border-radius: .3rem;
}
.checked{
    color:'#ff5930'
}
</style>
