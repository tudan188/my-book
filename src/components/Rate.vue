<template>
 <div class="rate">
     <span class="">☆☆☆☆☆</span>
     <div class="hollow" :style="style">
       ★★★★★
     </div>
 </div>
</template>

<script>
 export default {
  props:{
      value:{type:[Number,String],default:'0'}
  },
  computed:{
    style(){
      let  fraction = this.value/2
      if(fraction>2){
        fraction--
      }
      return `width:${fraction}em`
    }
  },
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style lang="scss">
.rate{
  position: relative;
  display: inline-block;
  .hollow{
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden; 
  }
}
 
</style>
