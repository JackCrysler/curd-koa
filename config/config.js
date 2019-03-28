module.exports = ()=>{
    return async (ctx,next)=>{
        ctx.state.key = 'Hello Kitty'
        ctx.headers={
            'Access-Control-Allow-Headers':"authrization"
        }
        await next()
    }
}