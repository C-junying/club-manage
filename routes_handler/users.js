// 加密
var bcryptc = require('bcryptjs')
// token令牌
var jwt = require('jsonwebtoken')
// promise错误可以让app.js接收
require('express-async-errors')

var userDao = require('../dao/UserDao')
const myUUid = require('../utils/myStr')
// 路由处理函数

// 测试
exports.test = (req, res) => {
  res.json({ code: 200, data: myUUid.moreUUID(1000) })
}
// 查看所有用户
exports.allUser = async (req, res) => {
  let ret = await userDao.queryAll()
  res.json({ code: 200, data: ret })
}
// 注册
exports.regUser = async (req, res) => {
  let user = req.body || req.params
  console.log(user)
  // 设置加密强度
  let salt = bcryptc.genSaltSync(10)
  // 用bcrypt加密
  user.password = bcryptc.hashSync(user.password, salt)
  let check = await userDao.login(user)
  if (check.length > 0) {
    res.json({ code: '3007', msg: '该用户邮箱已注册' })
  } else {
    let ret = await userDao.register(user)
    res.json({ code: 200, data: ret, msg: '注册成功' })
  }
}
// 登录
exports.login = async (req, res) => {
  const userinfo = req.body
  // 调用dao获取数据
  let ret = await userDao.login(req.body)
  if (ret.length === 0) {
    res.json({ code: 3002, msg: '该用户不存在' })
  } else {
    // bcrypt验证
    if (bcryptc.compareSync(req.body.password, ret[0].password)) {
      // 用户登录成功
      let token = jwt.sign(
        {
          userId: ret[0].userId,
          userName: ret[0].userName,
          password: ret[0].password,
          roleId: ret[0].roleId,
          roleName: ret[0].roleName,
          menuId: ret[0].menuId,
        },
        'david', //秘钥
        { expiresIn: 3600 * 24 } //有效期
      )
      res.json({ code: 200, data: token, msg: '登录成功' })
    } else {
      res.json({ code: 3003, msg: '密码输入错误' })
    }
  }
}
