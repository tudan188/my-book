<template>
  <div class="">
    <button open-type="getUserInfo" lang="zh_CN" @click="doLogin">获取用户信息</button>
  </div>
</template>

<script>

import {get,showSuccess} from "./util"
import qcloud from "wafer2-client-sdk"
import config from './config'
export default {
  data() {
    return {

    }
  },
  components: {

  },
  async created(){
    console.log("小程序启动了！")
  }
}
</script>

<style>
.text-primary{
  color:#EA5149;
}
.text-footer{
  text-align: center;
  margin: 10px 0;
  font-size: 18px;
}
.right{
  float: right;
}
.page-title{
  padding-left: 20px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}
.btn{
        background-color: #EA5A49;
        color: #fff;
        font-size: 14px;
        border-radius: 0;
        margin-top: 10px;
    }
</style>
