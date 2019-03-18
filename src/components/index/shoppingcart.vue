<template>
  <div id="app">
   购物车
  </div>
</template>

<script>
  export default {
    data(){
      return {
   
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

</style>
