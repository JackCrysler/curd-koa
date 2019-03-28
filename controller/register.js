const fs = require('mz/fs')
const jwt = require('jsonwebtoken')
const secretkey = '1608A'
const crypto = require('crypto');
let register_api = async (ctx, next) => {

    if (ctx.request.body) {
        //把用户信息存到指定数据库
        let {
            username,
            password
        } = ctx.request.body;
        
        let res = jwt.sign(username, secretkey);
        const hmac = crypto.createHmac('sha256', 'Jacky');
        hmac.update(password);

        let shaPwd = hmac.digest('hex')
        
        try{
            await ctx.mysql.query(`insert into user (user_id, user_name, user_pwd, create_date) values ('${res}', '${username}','${shaPwd}',LOCALTIME());`)
            ctx.response.body = {
                msg: '注册成功',
                code: 1
            }
        }catch(err){
            ctx.response.status = 402;
            ctx.response.body = {
                msg: '注册失败，用户名已存在',
                code: 0
            }
        }
        
    } else {
        ctx.response.body = {
            msg: '注册失败，请填写用户名和密码',
            code: 0
        }
    }
}

module.exports = {
    "POST /register": register_api
}