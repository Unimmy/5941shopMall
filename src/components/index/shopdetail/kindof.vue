<template>
    <div id="kindof">
        <mt-header fixed :title="mk">
        <div slot="left">
            <mt-button  icon="back" @click="$router.back(-1)"></mt-button>
        </div>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>
        <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
        </ul>
        </mt-loadmore> -->
    </div>
</template>

<script>
const qs =require('qs')
export default {
    data(){
        return {
            mk:'',//mk
           
        }
    },
    methods:{
        getSearch(){
         this.mk = this.$route.params.mk
        },
        getInfos(){
            let data ={
              	type:1,
                indexs:this.mk,
            }
            this.$http.post('/commodity/selectBySelect').then(res=>{
                console.log(res.data.data)
                }
            )
        },
        // loadTop(){
        //     console.log('刷新')
        //      this.$refs.loadmore.onTopLoaded();
        // },
        // loadBottom(){
        //    console.log('加载更过') 
        //    this.allLoaded = true// if all data are loaded
        //     this.$refs.loadmore.onBottomLoaded()

        // },
    },
    created(){
       this.getSearch()
       this. getInfos()
    }
}
</script>

<style>

</style>
