const jwt = require('jsonwebtoken')
let del_user = async (ctx,next)=>{
    console.log(ctx.headers.authorization)
    ctx.response.body={
        msg:'success',
        code:1
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