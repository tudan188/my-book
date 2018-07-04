<template>
 <div class="comment-list">
     <div class="page-title" v-if="comments.length">
         我的评论
     </div>
     <div  class="comment" @click="handleClick(comment)" v-for="(comment,index) in comments" :key="comments.id">
         <div class="user">
             <div class="inline">
                 <img :src="comment.image" alt="" class="avatar" mode="aspectFit">
                 {{comment.title}}
             </div>
             <div class="right">
                 {{comment.city || '未知地点'}}
                 <span class="text-primary">----</span>
                 {{comment.phone || '未知型号'}}
             </div>
             <div class="content">{{comment.comment}}</div>
         </div>
     </div>
 </div>
</template>

<script>
 export default {
     props:['comments','type'],
   data () {
     return {
         isModul:false
     }
   },
   methods:{
       handleClick(item){
           if(this.type === 'user'){
               wx.navigateTo({
                    url: '/pages/detail/main?id='+item.bookid
                })
           }
       }
   },
   components: {

   }
 }
</script>

<style lang="scss">
.comment-list{
    background-color: #eee;
    font-size: 14px;
    margin-bottom: 5px;
    border-bottom: 2px solid #ddd;
    .comment{
        background-color: #fff;
        padding: 5px 20px;
        border-bottom: 2px solid #ddd;
        .user{
            .inline{
                display: inline-block;
                height:20px;
                line-height:20px;
                .avatar{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    margin-right: 5px;
                    vertical-align:top;
                }
            }
           
        }
        .content{
            margin: 10px 0;
        }
    }
}
 
</style>
