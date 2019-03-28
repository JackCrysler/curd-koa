const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const roles = [{rolename:`超级管理员`,roletype:`0`}]
let add_manger = async (ctx,next)=>{
    console.log('add_manager')
    if (ctx.request.body) {
        //把用户信息存到指定数据库
        let {
            username,
            password
        } = ctx.request.body;
        

        if(!username || !password){
            ctx.response.status = 402;
            ctx.response.body = {
                msg:'用户名或密码为空',
                code:0
            }
            return
        }
        
        let manager_id = jwt.sign(username, ctx.state.key);
        const hmac = crypto.createHmac('sha256', 'Jacky');
        hmac.update(password);

        let user_pwd = hmac.digest('hex')
        let {rolename,roletype} = roles[0];
        try{
            await ctx.mysql.query(`insert into manager (user_id, user_name, user_pwd, create_date, role, roletype) values ('${manager_id}', '${username}','${user_pwd}',LOCALTIME(),'${rolename}','${roletype}');`)
            ctx.response.body = {
                msg: '添加成功',
                code: 1
            }
        }catch(err){
            console.log(err)
            ctx.response.status = 402;
            ctx.response.body = {
                msg: '添加失败，用户名重复',
                code: 0
            }
        }
        
    } else {
        ctx.response.body = {
            msg: '添加失败，缺失用户名和密码',
            code: 0
        }
    }
}

module.exports = {
    'POST /addmanager':add_manger
}