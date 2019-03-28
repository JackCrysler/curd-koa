const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const svgCaptcha = require('svg-captcha')

let key="hello kitty";

let login_api = async (ctx, next)=>{
    if(ctx.request.body){
        //把用户信息存到指定数据库
        let {username,password,captcha} = ctx.request.body;
        let cookie = ctx.cookies.get('captcha');
        try{
            //解析验证码
            let decoded = jwt.verify(cookie, key).toLowerCase();
            if(!captcha || captcha!==decoded){

                ctx.response.body={
                    msg:"验证码错误",
                    code:-1,
                    status:402
                }
    
            }else{
                const hmac = crypto.createHmac('sha256', 'Jacky');
                hmac.update(password);
                let shaPwd = hmac.digest('hex') 
                let results = await ctx.mysql.query(`select * from user where user_name='${username}' and user_pwd='${shaPwd}'`)
                let token = jwt.sign(username,ctx.state.key)
                if(results.length>0){
                    ctx.response.body={
                        msg:'登陆成功',
                        code:1,
                        token
                    }
                }else{
                    ctx.response.body={
                        msg:'用户名或密码错误',
                        code:0,
                        status:401
                    }
                }
            }
            
        }catch(err){
            ctx.response.status = 402;
            ctx.response.body={
                msg:"验证码错误",
                code:-1,
            }
        }
    }else{
        ctx.response.status = 401;
        ctx.response.body={
            msg:`信息错误`,
            code:0
        };
    }
}
let captcha_api =  (ctx,next)=>{ //session  token
    let captcha = svgCaptcha.create({
        noise:2,
        ignoreChars: '0o1i',
        background: '#cc9966' 
    })
    let signedCaptcha = jwt.sign(captcha.text,key);
    
    ctx.cookies.set('captcha', signedCaptcha)
    
    ctx.response.body={
        msg:'ok',
        code:1,
        data:captcha.data
    }
}

//定义controller
module.exports = {
    "POST /login":login_api,
    "GET /captcha":captcha_api,
}