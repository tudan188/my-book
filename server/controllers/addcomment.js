const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
    const {comment,phone,city,bookid,openId} = ctx.request.body
    try{
        await mysql('comments').insert({comment,phone,city,bookid,openId})
        ctx.state.data = {
            msg:'suc'
        }
    }catch(e){
        ctx.state={
            code:-1,
            data:{
                msg:'评论失败'+e.sqlMessage
            }
        }
    }
}