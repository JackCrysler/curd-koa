/*
 * @Description: Register and Login base on Koa
 * @Author: Jacky
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-25 13:34:30
 * @LastEditTime: 2019-03-28 09:38:01
 */
//MVC


const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router/config')
const mysql = require('./db/mysql')
const logger = require('koa-logger')

app.use(logger())
app.use(bodyParser())
app.use(mysql)
app.use(async (ctx,next)=>{
    ctx.state.key = 'Hello Kitty'
    ctx.headers={
        'Access-Control-Allow-Headers':"authrization",
        'Access-Control-Allow-Origin':'*'
    }
    await next()
})
app.use(async (ctx,next)=>{
    let whitelist =[['post','/login'],['get','/captcha'],['post','/register']];
    if(whitelist.find(item=>ctx.url==item[1]&&ctx.method.toLowerCase()==item[0].toLowerCase())){
        await next()
    }else{
        if(!ctx.headers.authorization){
            ctx.response.status = 401
            ctx.response.body = {
                msg:'没有登陆',
                code: 0
            }
        }else{
            await next()
        }
    }
})
app.use(router())
app.listen(8000,()=>{
    console.log(`server started at port 8000`)
})