/*
 * @Description: In User Settings Edit
 * @Author: shaoshan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-27 13:36:36
 * @LastEditTime: 2019-03-28 11:35:47
 */
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
let del_user = async (ctx,next)=>{
    try{
        let username = jwt.verify(ctx.headers.authorization,ctx.state.key);
        let {uid} = ctx.request.body
        let resuls = await ctx.mysql.query(`DELETE FROM user WHERE user_id='${uid}';`)

        ctx.response.body={
            msg:'删除成功',
            code:1,
            executor: username
        }
    }catch(err){
        ctx.response.status = 401
        ctx.response.body = {
            msg:'没有权限',
            code: 0
        }
    }
}
let all_users = async (ctx,next)=>{
    try{
        let username = jwt.verify(ctx.headers.authorization,ctx.state.key);
        let resuls = await ctx.mysql.query(`select * from user;`)
        ctx.response.body={
            msg:'success',
            code:1,
            data:resuls,
            username
        }
    }catch(err){
        ctx.response.status = 401
        ctx.response.body = {
            msg:'没有权限',
            code: 0
        }
    }
}
/**
 * @description: 可修改的字段
 *      nickname,
        gender,
        phone_number,
        email,
        status,
        role
 * @param {type} 
 * @return: 
 */
let editUser = async (ctx,next)=>{
    let userdata = ctx.request.body;
    if(!userdata || !userdata.user_id){
        ctx.response.status = 402
        ctx.response.body={
            msg:'无修改信息，或者缺失用户user_id',
            code:0
        }
        return
    }
    let {
        user_id,
        nickname,
        gender,
        phone_number,
        email,
        status,
        role
    }=userdata;
    try{
        let result = await ctx.mysql.query(`
            UPDATE user SET gender='${gender}',nickname='${nickname}',phone_number='${phone_number}',email='${email}',status='${status}',role='${role}' WHERE user_id='${user_id}';
        `)

        ctx.response.body={
            msg:'用户信息修改成功',
            code:1
        }
    }catch(err){
        console.log('Error_____________',err)
        ctx.response.status=500
        ctx.response.body={
            msg:'UPDATE TABLE USER ERROR',
            detail: err.Error,
            code:0
        }
    }
    //UPDATE user SET user_name='狮子',gender='男',nickname='辛巴',phone_number='13333333333',email='asda@163.com',status='1',role='管理员' WHERE user_id='eyJhbGciOiJIUzI1NiJ9.dXNlcm5hbWU.zjCtktx9zgAUcS4YIdTGV8825-T4ahK4heA9Oe7qIAE';
}

let modifyPwd = async (ctx)=>{
    let userdata = ctx.request.body;
    if(!userdata || !userdata.uid){
        ctx.response.status = 402
        ctx.response.body={
            msg:'无修改信息，或者缺失用户uid',
            code:0
        }
        return
    }
    let {
        user_id,
        user_pwd
    }=userdata;
    const hmac = crypto.createHmac('sha256', 'Jacky');
        hmac.update(user_pwd);

        let userpwd = hmac.digest('hex')
    try{
        let result = await ctx.mysql.query(`
            UPDATE user SET 
            user_pwd='${userpwd}'
            WHERE user_id='${user_id}';
        `)
        ctx.response.body={
            msg:'用户密码修改成功',
            code:1
        }
    }catch(err){
        ctx.response.status=500
        ctx.response.body={
            msg:'UPDATE TABLE USER_PWD ERROR',
            code:0
        }
    }
}

module.exports = {
    'POST /deluser':del_user,
    "GET /alluser":all_users,
    "POST /edituser":editUser,
    "POST /modifypwd":modifyPwd,
}