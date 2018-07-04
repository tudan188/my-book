<template>
 <div>
     <BookInfo :info="info"></BookInfo>
     <Commentlist :comments="comments"></Commentlist>
     <div class="comment" v-if="showAdd">
         <textarea  class="textarea" :maxlength="100" v-model="comment" placeholder="请输入图书短评，最多100字" ></textarea>
         <div class="city">
             <div class="title">地理位置：</div>
              <switch color="#EA5A49" :checked="city"  @change="getGeo"/>
              <span class="text-primary">{{city}}</span>
         </div>
         <div class="phone">
             <div class="title">手机型号：</div>
              <switch color="#EA5A49" :checked="phone"  @change="getPhone"/>
              <span class="text-primary">{{phone}}</span>
         </div>
         <button  class="btn" @click="addComment">评论</button>
     </div>
     <div class="" v-else class="text-footer">
         未登录或者已经评论过拉
     </div>
     <button class="btn" open-type="share">转发给好友</button>
 </div>
</template>

<script>

import {get,post,showModal} from "@/util"
import BookInfo from "@/components/BookInfo"
import Commentlist from "@/components/Commentlist"

 export default {
     mounted(){
         this.bookid = this.$root.$mp.query.id
         this.getDetail()
         this.getComments()
         let user = wx.getStorageSync('userInfo');
         if(user){
             this.userinfo =user
         }
     },
   data () {
     return {
         comments:[],
         userinfo:{},
         bookid:'',
         info:{},
         comment:'',
         phone:'',
         city:'',
     }
   },
   methods:{
    //    获取图书详情
       async getDetail(){
           const info = await get('/weapp/bookdetail',{id:this.bookid})
           this.info = info
        //    console.log(info)
           wx.setNavigationBarTitle({
            title: info.title
            })
       },
    //    获取设备信息
       getPhone(e){
           if(e.target.value){
               const phoneInfo = wx.getSystemInfoSync()
            //    console.log(phoneInfo)
                this.phone = phoneInfo.model
           }else{
               this.phone = ''
           }
       },
    //    获取地理位置
       getGeo(e){
            if(e.target.value){
                // HX824iGwQ93c4rooRDfZYrbW58ZtvWW5
                //http://api.map.baidu.com/geocoder/v2/
                let ak = 'HX824iGwQ93c4rooRDfZYrbW58ZtvWW5'
                let url  = 'http://api.map.baidu.com/geocoder/v2/'
                const _this = this
                wx.getLocation({
                    success: function(res) {
                        wx.request({
                            url,
                            data:{
                                location:`${res.latitude},${res.longitude}`,
                                ak,
                                output:'json'
                            },
                             success: function(res) {
                                // console.log(res)
                                // console.log(res.data)
                                if(res.data.status === 0){
                                    _this.city = res.data.result.addressComponent.city
                                    // console.log(res.data.result.addressComponent.city)
                                    // console.log(this.city)
                                }else{
                                    _this.city = "未知地点"
                                    console.log('错误了')
                                }
                            },
                            fail:res=>{
                                console.log('错误了',res)
                            }
                        })
                        console.log(res)
                    }
                })
            }else{
                this.city =""
            }
       },
    //   提交评论
     async   addComment(){
            if(!this.comment){
                return
            }
            const data = {
                comment:this.comment,
                phone:this.phone,
                city:this.city,
                bookid:this.bookid,
                openId:this.userinfo.openId
            }
          try{
              let res = await post('/weapp/addcomment',data)
              this.comment = ''
              this.getComments()
            //   console.log(res)
            if(res.msg =="suc"){
                showModal('成功','评论成功')
            }
          }catch(e){
              showModal('失败',e.msg)
          }
        },
        // 获取评论
        async getComments(){
            const comments = await get('/weapp/commentlist',{bookid:this.bookid})
            this.comments = comments.list
            // console.log(comments)
        }
   },
   computed:{
       showAdd(){
            //    没登录
            if(!this.userinfo.openId){
                return false
            }
            // 评论页面查到有自己的openid
            if(this.comments.filter(v=>v.openid==this.userinfo.openId).length){
                return false
            }
            return true
       }
   },
   components: {
       BookInfo,Commentlist
   }
 }
</script>

<style lang="scss">
switch{width:100px !important;font-size: 14px !important;}
switch::before{width:100px !important;font-size: 14px !important;}
switch::after{width: 100px !important;font-size: 14px !important;}//中间小圆球
.comment{
    margin-top:10px;
    .textarea{
        background: #eee;
        width: 730rpx;
        height: 200rpx;
        padding: 10rpx;
    }
    .city{ 
        margin-top: 10px;
        display: flex;
        align-items: center;
        .title{display: inline-block;}
    }
    .phone{
        display: flex;
        align-items: center;
        margin-top: 10px;
        .title{display: inline-block;}
    }
}
</style>
