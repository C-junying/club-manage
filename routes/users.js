var express = require('express')
var router = express.Router()

// 注册新用户
router.post('/register', (req, res) => {
  res.send('register')
})
// 登录
router.get('/login', (req, res) => {
  res.send('login')
})

module.exports = router
