// 新增图书
// 1.获取豆瓣图书
// https://api.douban.com/v2/book/isbn/:9787111187769
// 2.入库


const https = require('https')
const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
    const {isbn,openId} = ctx.request.body;
    if(isbn && openId){

        const findRes = await mysql("books").select().where('isbn',isbn)

        if(findRes.length){
            ctx.state = {
                code:-1,
                data:{
                    msg:'图书已存在'
                }
            }
            return
        }

        let url = 'https://api.douban.com/v2/book/isbn/'+isbn;
        const bookInfo = await getJson(url);
        // console.log(bookInfo)
        const rate = bookInfo.rating.average;
        const {title,image,alt,publisher,summary,price} = bookInfo;
        const tags = bookInfo.tags.map(v=>{
            return `${v.title} ${v.count}`
        }).join(',');
        const author = bookInfo.author.join(',');
        console.log(`${rate}rate`)
        console.log(`${title}title`)
        console.log(`${image}image`)
        console.log(`${alt}alt`)
        console.log(`${publisher}publisher`)
        console.log(`${summary}summary`)
        console.log(`${price}price`)
        console.log(`${tags}tags`)
        console.log(`${author}author`)
        try{
            await mysql('books').insert({
                isbn,openId,rate,title,image,alt,publisher,summary,price,tags,author
            })
            ctx.state.data ={
                code:0,
                title,
                msg:"success"
            }
        }catch(e){
            ctx.state={
                code:-1,
                data:{
                    msg:"新增失败"+e.sqlMessage
                }
            }
        }

    }
}

function getJson(url){
    return new Promise((resolve,reject)=>{
        https.get(url,res=>{
            let urlData = '';
            res.on('data',data=>{
                urlData+= data
            })
            res.on('end',data=>{
                const bookInfo = JSON.parse(urlData);
                if(bookInfo.title){
                    resolve(bookInfo)
                }
                reject(bookInfo)
            })
        })
    })
}