const fs = require('fs')
const root = process.cwd()
const path = require('path')
const Router = require('koa-router')
const router = new Router()

function setControllers(dir = 'controller') {
    let cpath = path.resolve(root, dir)
    let files = fs.readdirSync(cpath)
    files.forEach((file) => {
        if (file.endsWith('.js')) {
            let content = require(cpath + '/' + file);
            addRoute(content)
        }
    })
}

function addRoute(obj) {
    for (let i in obj) {
        if (i.startsWith('POST ')) {
            router.post(i.substring(5), obj[i])
        }
        if (i.startsWith('GET ')) {
            router.get(i.substring(4), obj[i])
        }
    }
}


module.exports = (dir) => {
    //  add route 
    setControllers(dir)

    return router.routes()
}