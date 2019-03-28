function passport(){
    return async (ctx,next)=>{
        //白名单
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
    }
}
module.exports = passport