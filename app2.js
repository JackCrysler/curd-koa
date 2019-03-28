/*
 * @Description: CURD WEB
 * @Author: shaoshan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-25 13:34:30
 * @LastEditTime: 2019-03-28 09:59:57
 */


const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router/config')
const mysql = require('./db/mysql')
const logger = require('koa-logger')
const passport = require('./config/passport')
const config = require('./config/config')
app.use(logger())
app.use(bodyParser())
//全局配置
app.use(config())
//配置mysql
app.use(mysql())
//路由权限+白名单
app.use(passport())
//配置路由
app.use(router())
//启动服务
app.listen(8000,()=>{
    console.log(`server started at port 8000`)
})