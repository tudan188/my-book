<template>
  <div class="container">
      <Commentlist v-if="userinfo.openId" type="user" :comments="comments"></Commentlist>

      <div class="" v-if="userinfo.openId">
        <div class="page-title">我的图书</div>
        <card :key="book.id" v-for="book in books" :book=book></card>
        <div class="" v-if="!books.length">暂时还没添加过书，快去添加几本书吧！</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {get} from "@/util"
import Commentlist from "@/components/Commentlist"
import Card from "@/components/Card"
export default {
  data() {
    return {
      comments:[],
      books:[],
      userinfo:{}
    }
  },
  onShow(){
    if(!this.userinfo.openId){
      let userinfo = wx.getStorageSync('userInfo');
        if(userinfo){
          this.userinfo =userinfo
          this.init()
        }
    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.init()
    wx.stopPullDownRefresh()
  },
  methods:{
    // 初始化
    init(){
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
        // 获取评论
    async getComments(){
        const comments = await get('/weapp/commentlist',{openId:this.userinfo.openId})
        this.comments = comments.list
        // console.log(comments)
    },
    // 获取图书
    async getBooks(){
      const books = await get('/weapp/bookList',{openId:this.userinfo.openId})
      this.books = books.list
    }
  },
  components: {
    Commentlist,Card
  }
}
</script>

<style scoped>
</style>
