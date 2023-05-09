var express = require('express')
var router = express.Router()

// 导入路由处理函数
const activityHandle = require('../../routes_handler/activity/activity')
// 查看所有申请活动记录
router.post('/applyActivityAll', activityHandle.applyActivityAll)

// 审核列表模糊查询
router.post('/searchApplyActivity', activityHandle.searchApplyActivity)

// 查看当前社团有哪些活动申请
router.post('/clubApplyActivityAll', activityHandle.clubApplyActivityAll)
// 查看activity_id的申请活动记录
router.post('/activityIdApplyActivity', activityHandle.activityIdApplyActivity)
// 提交申请活动
router.post('/addActivityApply', activityHandle.addActivityApply)

// 审核申请活动
router.post('/auditApplyActivity', activityHandle.auditApplyActivity)

// 发布活动
router.post('/releaseActivity', activityHandle.releaseActivity)

// 删除申请活动记录
router.post('/deleteApplyActivity', activityHandle.deleteApplyActivity)

module.exports = router
