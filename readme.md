koa课程计划

    1. async函数
    2. 中间件概念
    3. koa介绍+基本应用
    4. url处理  koa-bodyParser
    5. 注册与登录，连接mysql
    6. 处理静态文件的middleware   koa-static 
    7. 视图渲染 模板引擎 render函数封装   koa-views
    8. case：登陆+验证（图形）+加密（crypto模块 hash或者hmac单向加密）+jwt
    9. session和token   session 存储redis数据库(mysql关系型数据库的补充)
    10. controller+services模块化封装
    11. Sequelize （ORM）
    12. 验证权限的中间件
    13. http+socket

JsonWebToken 加密  双向
crypto  hmac  hash  单向  

token流程:

    用户登陆=> 用户名和密码 => 双向加密（jsonwebtoken 结合 密钥） => token密令 => 返回客户端 => 客户端保存

    => 客户端携带token与后端进行交互

session:

    后端通过http请求操作cookie， 通过cookie来存储session

    redis

    mongodb





