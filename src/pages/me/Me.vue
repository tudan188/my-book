<template>
  <div class="container">
    <div class="userInfo" @click="login">
       <image class="avatar" :src="userInfo.avatarUrl"></image> 
        <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if="userInfo.openId" @click="scanBook()" class="btn">添加图书</button>
  </div>
</template>

<script type="text/ecmascript-6">

import YearProgress from "@/components/YearProgress"
import {showSuccess,post,showModal} from "@/util"
import qcloud from "wafer2-client-sdk"
import config from '@/config'
export default {
  data() {
    return {
      userInfo:{
        avatarUrl:'./../../../static/img/me.png',
        nickName:'点击登录'
      }
    }
  },
   mounted(){
  
  },
  methods:{
    async addBook(isbn){
      const res = await post('/weapp/addbook',{isbn,openId:this.userInfo.openId});
      showModal('添加成功',`<<${res.title}>> 添加成功`)
    },
    scanBook(){
      wx.scanCode({
        success: (res) => {
          if(res.result){
            this.addBook(res.result)
          }
        }
      })
    },
    login(){
      console.log('login11');
      let user = wx.getStorageSync('userInfo');
      const self = this;
      if(!user){
          // 设置登录地址
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.login({
            success: function (userInfo) {
                console.log('登录成功', userInfo);
                showSuccess('登录成功');
                wx.setStorageSync('userInfo',userInfo);
                self.userInfo = userInfo;
            },
            fail: function (err) {
                console.log('登录失败', err);
            }
        });
      }else{
        this.userInfo = user;
      }
    },

  },
  created(){
    let user = wx.getStorageSync('userInfo');
    if(user){
      this.userInfo = user;
    }
  },
  components: {
    YearProgress
  }
}
</script>

<style lang="scss">
.container{
  padding: 0 30rpx;
  
}
.userInfo{
  border-color:transparent;
  border-radius: 0;
  background-color: null;
    margin-top:100rpx;
      text-align: center;
    .avatar{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
.btn{
  color:#fff;
  background-color:#ea5a49;
  margin-bottom:10px;
  padding-left:15px;
  border-radius:2px;
  font-size:16px;
  line-height:40px;
  height:40px;
  width:100%;
}
.btn:active{  background-color:#Fa5a49;}
</style>
