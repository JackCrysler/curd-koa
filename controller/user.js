const jwt = require('jsonwebtoken')
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

module.exports = {
    'POST /deluser':del_user,
    "GET /alluser":all_users
}