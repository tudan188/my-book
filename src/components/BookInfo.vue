<template>
 <div class="bookinfo">
     <div class="thumb">
        <img :src="info.image" alt="" class="back" mode="aspectFill">
        <img :src="info.image" alt="" class="img" mode="aspectFit">
        <div class="info">
            <div class="title">{{info.title}}</div>
            <div class="author">{{info.author}}</div>
        </div>
     </div>
     <div class="detail">
        <div class="">
             <img :src="userinfo.image" alt="" class="avatar" mode="aspectFit">
            {{userinfo.name}}
        </div>
        <div class="right">{{info.rate}}分<Rate :value='info.rate'></Rate></div>
     </div>
     <div class="detail">
         {{info.publisher}}
         <div class="right">{{info.price}}</div>
     </div>
     <div class="tags">
         <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
     </div>
     <div class="summary">
         <p :key="i" v-for="(sum,i) in info.summary">{{sum}}</p>
     </div>
 </div>
</template>

<script>
import Rate from "@/components/Rate"
 export default {
     props:['info'],
     computed:{
         userinfo(){
             return this.info.user_info||{}
        }
     },
   data () {
     return {

     }
   },
   components: {
       Rate
   }
 }
</script>

<style lang="scss">
.bookinfo{
    font-size: 14px;
    .badge{
        display: inline-block;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border:1px solid #EA5A49;
        color:#EA5A49;
    }
    .summary{
        margin-top: 10px;
        padding: 0 10px;
        p{
            text-indent: 2em;
            font-size: 14px;
        }
    }
    .right{
        float: right;
    }
    .detail{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:5px 10px;
        &>div{
            display: flex;
            align-items: center;
        }
        .avatar{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 5px;
        }
    }
    .thumb{
        width: 750rpx;
        height: 450rpx;
        overflow: hidden;
        position: relative;
        .back{
            filter:blur(15px); //非欧特
            width: 100%;
            height: 100%;
        }
        .img{
            position:absolute;
            width: 100%;
            left:0;
            height: 300rpx;
            top: 30rpx;
        }
        .info{
            color: #fff;
            position: absolute;
            width: 100%;
            left: 0;
            top:330rpx;
            text-align: center;
            margin-top: 10px;
            .title{
                font-size: 14px;
            }
        }

    }

}
 
</style>
