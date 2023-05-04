const express = require('express')
const router = express.Router()
// 核心路由
// 自定义模块
const homeRouter = require('./home')
// 用户模块
const usersRouter = require('./users')
// 菜单模块
const menuRouter = require('./menu')
// 角色模块
const roleRouter = require('./roles')
// 文件模块
const fileRouter = require('./file')
// 活动模块
const activityRouter = require('./activity/activity')
// 活动类型模块
const activityTypeRouter = require('./activity/activityType')
// 社团模块
const clubRouter = require('./club/club')
// 社团类型模块
const clubTypeRouter = require('./club/clubType')
// 场地模块
const areaRouter = require('./area')

// 使用路由前缀地址
router.use('/', homeRouter)
router.use('/users', usersRouter)
router.use('/menu', menuRouter)
router.use('/role', roleRouter)
router.use('/images', fileRouter)
router.use('/club', clubRouter)
router.use('/club', clubTypeRouter)
router.use('/activity', activityRouter)
router.use('/activity', activityTypeRouter)
router.use('/area', areaRouter)

module.exports = router
