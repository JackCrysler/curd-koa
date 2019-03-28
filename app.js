const Koa = require('koa')
const app = new Koa()
const port = 8000
//ctx: context上下文
//指定URL的路由
app.use(async (ctx,next)=>{
    await next()
    let rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async (ctx,next)=>{
    let start = Date.now()

    await next()

    let ms = Date.now()-start;
    ctx.set('X-Response-Time',ms)
})

app.use(async (ctx,next)=>{
    ctx.response.type='text/html'
    ctx.response.body='<h1>Hello World!!!!!!</h1>';
    await next()
})

app.use(async (ctx,next)=>{
    if(ctx.url=='/a'){
        // ctx.response.type = 'text/html';
        ctx.response.body="<h1>a</h1>"
    }
    if(ctx.url=='/b'){
        //mime 文件类型
        // ctx.response.type = 'text/html';
        ctx.response.body="<h1>b</h1>"
    }
})

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})