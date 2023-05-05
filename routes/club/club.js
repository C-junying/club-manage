var express = require('express')
var router = express.Router()

// 导入路由处理函数
const clubHandle = require('../../routes_handler/club/club')

// 查看所有申请社团记录
router.post('/applyClubAll', clubHandle.applyClubAll)

// 查看当前用户有哪些申请社团记录
router.post('/userApplyClubAll', clubHandle.userApplyClubAll)
// 查看apply_id的申请社团记录
router.post('/applyIdApplyClub', clubHandle.applyIdApplyClub)
// 提交申请社团记录
router.post('/addApplyClub', clubHandle.addApplyClub)
// 审核申请社团
router.post('/auditApplyClub', clubHandle.auditApplyClub)
// 删除申请社团记录
router.post('/deleteApplyClub', clubHandle.deleteApplyClub)

module.exports = router
