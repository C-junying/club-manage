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
// 所有活动
router.post('/getManageActivityAll', activityHandle.getManageActivityAll)
// 查看活动 模糊查询
router.post('/searchActivity', activityHandle.searchActivity)

// 全校活动
router.post('/getActivityAll', activityHandle.getActivityAll)
// 查看activityId的社团信息
router.post('/activityIdClub', activityHandle.activityIdClub)
// 社团活动
router.post('/getClubActivityAll', activityHandle.getClubActivityAll)
// 根据activityId和userId查看当前用户在社团担任什么职位
router.post('/activityIdUserIdToBearName', activityHandle.activityIdUserIdToBearName)
module.exports = router
