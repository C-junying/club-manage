const express = require('express')
var router = express.Router()

// 导入路由处理函数
const menuHandler = require('../routes_handler/menu')

// 获取所有菜单，角色需要
router.post('/roleSelect', menuHandler.roleSelect)

// 根据token角色获得菜单
router.post('/menuList', menuHandler.menuTokenList)

// 根据roleId角色获得菜单
router.post('/roleIdMenuList'.menuHandler.roleIdMenuList)

// 菜单列表
router.post('/getListByPage', menuHandler.getListByPage)

// 对菜单ID，菜单名称，菜单路径模糊查询
router.post('/search', menuHandler.search)

// 添加菜单
router.post('/addMenu', menuHandler.addMenu)

// 编辑菜单
router.post('/updateMenu', menuHandler.updateMenu)

// 删除菜单
router.post('/deleteMenu', menuHandler.deleteMenu)
module.exports = router
