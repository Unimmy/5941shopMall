<template>
    <div id="login">
    <mt-header fixed title="登录">
        <!-- <div slot="left">
            <mt-button  icon="back" @click="$router.back(-1)"></mt-button>
        </div> -->
    </mt-header>
       <div class="container">
            <div class="logoBox">  
                <img src="../../assets/icon/5941.png" width="25%;"/>
            </div>
        <div>
          <mt-field label="用户名" placeholder="请输入您的手机号" type="tel" v-model="sendInfo.phone"></mt-field>
          <mt-field label="密码" placeholder="请输入您的密码" type="password" v-model="sendInfo.password"></mt-field>
          <mt-button type="primary" class="primary" size="large" @click="login()">登录</mt-button>
        </div>
        </div>
    </div>
</template>

<script>
const qs = require('qs')
import store from '@/store/store.js'
import { MessageBox } from 'mint-ui'
export default {
data(){
    return {
        sendInfo:{
            phone:'',
            password:'',
            UID:this.$store.state.UID
        }
       
    }
},
methods:{
     login(){
         let data = {
             uname:this.sendInfo.phone,
             password:this.sendInfo.password,
             type:4,
             UID:this.sendInfo.UID
             }
         this.$http.post('/member/login',qs.stringify(data),{
             headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
             }
         }).then(res=>{
           if(res.data.status==200){
               MessageBox.alert('登录成功!').then(action => {
                   this.$store.state.phone = this.sendInfo.phone
                   console.log(res.data.data)
                   this.$store.state.headpic = res.data.data.portrait
                    this.$store.state.nickname = res.data.data.nickname
                    this.$router.back(-1)
                }).catch(error=>console.log(error))
           }else{
                MessageBox.alert(res.data.message)
           }
         })
    }
},  
created(){
   
},
store
}
</script>

<style scoped>
.primary{
    background: #ff5930;
    width: 80%;
    margin:0 auto;
    margin-top: 2rem;
}
.container{
 margin:5rem auto;
}
.logoBox{
    text-align: center;
    margin-bottom: 3rem;
}

</style>
