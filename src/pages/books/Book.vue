<template>
  <div class="">
      <TopSwiper :tops="tops"></TopSwiper>
      <div>
          <card :key="book.id" v-for="book in books" :book=book></card>
          <p class="text-footer" v-if="!more">没有更多数据</p>
      </div>
       <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="doLogin">获取用户信息</button>
  </div>
</template>

<script type="text/ecmascript-6">

import qcloud from "wafer2-client-sdk"
import config from './../../config'
import {showSuccess,get,showModal} from "@/util"
import Card from "@/components/Card"
import TopSwiper from "@/components/TopSwiper"
export default {
  data() {
    return {
        books:[],//图书数据
        page:0,//当前页数
        more:true, //是否有数据
        tops:[] //轮播数据
    }
  },
  methods:{
    doLogin() {
        console.log('login')
        const session = qcloud.Session.get()
            if (session) {
                // 第二次登录
                // 或者本地已经有登录态
                // 可使用本函数更新登录态
                qcloud.loginWithCode({
                    success: res => {
                        this.setData({ userInfo: res, logged: true })
                        util.showSuccess('登录成功')
                    },
                    fail: err => {
                        console.error(err)
                        util.showModel('登录错误', err.message)
                    }
                })
            } else {
                // 首次登录
                qcloud.login({
                    success: res => {
                        this.setData({ userInfo: res, logged: true })
                        util.showSuccess('登录成功')
                    },
                    fail: err => {
                        console.error(err)
                        util.showModel('登录错误', err.message)
                    }
                })
            }
    },
    // 获取图书
    async getList(init){
        if(init){
            this.page = 0
            this.more = true
        }
        wx.showNavigationBarLoading() //在当前页面显示导航条加载动画。
        // 异步获取图书数据
        const books = await get('/weapp/bookList',{page:this.page})

        if(books.list.length<10 && this.page>0){
            this.more = false 
        }
        if(init){
            this.books = books.list
            wx.stopPullDownRefresh() //停止当前页面下拉刷新。
        }else{
            this.books = this.books.concat(books.list)
        }
        wx.hideNavigationBarLoading() //隐藏导航条加载动画。
    },
    async getTop(){
        const tops = await get('/weapp/top')
        this.tops =tops.list
    }
  },
//   上拉加载 初始化
  onPullDownRefresh(){
     this.getList(true)
     this.getTop()
  },
//   下拉加载
  onReachBottom(){
      if(!this.more){
        //   没有更多了
        return false
      }
      this.page ++
      this.getList()
  },
  components: {
      Card,TopSwiper
  },
  mounted(){
      this.getList(true)
      this.getTop()
  }
}
</script>

<style lang="scss">

</style>
