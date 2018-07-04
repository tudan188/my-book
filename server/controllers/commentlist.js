const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
    const {bookid,openId} = ctx.request.query
    let comments 
    const mysqlSelect =  mysql('comments').select('comments.*','cSessionInfo.user_info')
                            .join('cSessionInfo','comments.openid','cSessionInfo.open_id')

    if(bookid){
         comments =await mysqlSelect.where('bookid',bookid)
    }else if(openId){
         comments =await mysqlSelect.where('openId',openId)
    }
    ctx.state.data={
        list:comments.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                title:info.nickName,
                image:info.avatarUrl
            })
        })
    }
}