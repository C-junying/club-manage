const express = require('express')
var router = express.Router()

// 导入路由处理函数
const usersHandle = require('../routes_handler/users')

// 测试
router.post('/test', usersHandle.test)
// 查看所有用户
router.post('/queryAll', usersHandle.allUser)
// 注册新用户
router.post('/register', usersHandle.regUser)
// 登录
router.post('/login', usersHandle.login)

module.exports = router
