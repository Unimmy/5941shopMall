<template>
    <div id="kindof">
        <mt-header fixed :title="largeClass">
        <div slot="left">
            <mt-button  icon="back" @click="$router.back(-1)"></mt-button>
        </div>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li v-for="item in list" :key="item">{{ item }}</li>
        </ul>
        </mt-loadmore>
    </div>
</template>

<script>
const qs =require('qs')
export default {
    data(){
        return {
            largeClass:'',//大类
            list:''
        }
    },
    methods:{
        getSearch(){
         this.largeClass = this.$route.params.largeclass
        },
        getInfos(){
            let data ={
              	type:1,
                fineclass:this.largeClass,
                indexs:indexs
            }
            this.$http.post().then(res=>{
                console.log(res.data.data)
                }
            )
        }
    },
    created(){
       this.getSearch()
    }
}
</script>

<style>

</style>
