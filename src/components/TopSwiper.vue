<template>
 <div class="swiper">
     <swiper :indicator-dots="true" indicator-color="#EA5A49" :autoplay="true" :interval="6000" :duration="1000" :circular="true">
         <div class="" :key="imgIndex" v-for="(top,imgIndex) in imgUrls">
             <swiper-item>
                <img @click='bookDetail(img)' mode="aspectFit" :key="index" v-for="(img,index) in top" :src="img.image" class="slide-image"/>
            </swiper-item>
         </div>
    </swiper>
 </div>
</template>

<script>
 export default {
     props:['tops'],
     computed:{
         imgUrls(){
             let res = this.tops
             let ceshi =[res.slice(0,3),res.slice(3,6),res.slice(6,9)]
             // [Array(3), Array(3), Array(3)]
             return [res.slice(0,3),res.slice(3,6),res.slice(6,9)]
         }
     },
   data () {
     return {
         
     }
   },
   methods:{
       bookDetail(item){
           wx.navigateTo({
               url:'/pages/detail/main?id='+item.id
           })
       }
   },
   components: {

   }
 }
</script>

<style lang="scss">
.swiper{
    margin-top: 5px;
    .slide-image{
        width: 33%;
        height: 250rpx;
    }
}
 
</style>
