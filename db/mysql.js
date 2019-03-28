const dbconfig = require('./index')
const mysql = require('mysql')
const connection = mysql.createPool(dbconfig)

module.exports = async (ctx,next)=>{
    ctx.mysql = {
        query(sqlstr){
            return new Promise((resolve,reject)=>{
                connection.query(sqlstr,(err,results)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(results)
                    }
                })
            })
        }
    }
    await next()
}