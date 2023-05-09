// promise错误可以让app.js接收
require('express-async-errors')

// 引入数据操作
const activityDao = require('../../dao/activity/ActivityDao')
const clubDao = require('../../dao/club/ClubDao')
const areaDao = require('../../dao/AreaDao')
const memberDao = require('../../dao/activity/ActivityMemberDao')
const costDao = require('../../dao/CostDao')
const teacherDao = require('../../dao/TeacherDao')
// 生成16位UUID
const { uuid, getNowTime } = require('../../utils/myStr')
const { toHump } = require('../../utils/toHump')

// 查看所有申请活动记录
exports.applyActivityAll = async (req, res) => {
  let ret = await activityDao.applyActivityAll()
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}
// 审核列表模糊查询
exports.searchApplyActivity = async (req, res) => {
  let search = req.body || req.params
  let ret = await activityDao.searchApplyActivity(search.keywords)
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}

// 查看当前社团有哪些活动申请
exports.clubApplyActivityAll = async (req, res) => {
  let club = req.body || req.params
  let ret = await activityDao.clubApplyActivityAll(club.clubId)
  ret.sort((a, b) => b['apply_time'] - a['apply_time'])
  res.json({ code: 200, data: ret })
}
// 查看activity_id的申请活动记录
exports.activityIdApplyActivity = async (req, res) => {
  let activity = req.body || req.params
  let ret = await activityDao.activityIdApplyActivity(activity.activityId)
  res.json({ code: 200, data: ret })
}
// 提交申请活动
exports.addActivityApply = async (req, res) => {
  // 获取数据
  let activityApply = req.body || req.params
  // 添加数据
  activityApply.applyInfo.applyId = uuid()
  activityApply.applyInfo.applyTime = getNowTime()
  activityApply.activityInfor.activityId = uuid()
  activityApply.activityInfor.bearName = '指导老师'
  activityApply.activityInfor.activityState = 0
  //   判断社团金额是否足够
  let clubMoney = await clubDao.clubIdApplyClub(activityApply.activityInfor.clubId)
  if (clubMoney[0].money < activityApply.activityInfor.money) {
    res.json({ code: 3200, msg: '使用金额大于社团拥有的金额，请联系社长' })
    return
  }
  // 判断场地是否可以用
  let flag = await areaDao.auditArea(activityApply.applyInfo.areaId)
  if (flag.length > 0) {
    res.json({ code: 3200, flag, msg: '场地已经被使用，请更换' })
  } else {
    // 占用场地
    const area = await areaDao.occupyArea(2, activityApply.applyInfo.areaId)
    // 执行申请活动
    const activity = await activityDao.addActivityApply(
      activityApply.applyInfo,
      activityApply.activityInfor,
      req.auth
    )
    // 返回执行
    res.json({ code: 200, data: { area, activity }, msg: '添加成功' })
  }
}
// 审核申请活动
exports.auditApplyActivity = async (req, res) => {
  let apply = req.body || req.params
  // 记录时间
  apply.replyTime = getNowTime()
  let ret = await activityDao.auditApplyActivity(apply)
  if (apply.applyState === 1) {
    await memberDao.addMember({
      userId: apply.applyUser,
      activityId: apply.activityId,
      bearName: '活动负责人',
      appraise: '',
      joinTime: apply.replyTime,
    })
    let activtyInfo = await activityDao.activityIdApplyActivity(apply.activityId)
    activtyInfo = toHump(activtyInfo[0])
    let clubInfo = await clubDao.clubIdClub(activtyInfo.clubId)
    let club = {
      clubId: activtyInfo.clubId,
      money: clubInfo[0].money - activtyInfo.money,
    }
    // 第一个是社团的支出
    // 第二个是活动
    let bill1 = [
      uuid(),
      activtyInfo.name,
      activtyInfo.clubId,
      activtyInfo.clubId,
      activtyInfo.applyUser,
      activtyInfo.activityId,
      apply.replyTime,
      '1',
      '支出',
      activtyInfo.applyContent,
    ]
    let bill2 = [
      uuid(),
      activtyInfo.name,
      activtyInfo.activityId,
      activtyInfo.clubId,
      activtyInfo.applyUser,
      activtyInfo.activityId,
      apply.replyTime,
      '1',
      '收入',
      activtyInfo.applyContent,
    ]
    let billList = [bill1, bill2]
    let projectList = [
      [uuid(), bill1[0], bill1[1], 1, activtyInfo.money],
      [uuid(), bill2[0], bill2[1], 1, activtyInfo.money],
    ]
    let result = await costDao.auditCostApplyPass(club, billList, projectList)
    res.json({ code: 200, data: result, msg: '审核通过' })
  } else {
    await areaDao.occupyArea(1, apply.areaId)
    res.json({ code: 3200, data: ret, msg: '驳回成功' })
  }
}
// 发布活动
exports.releaseActivity = async (req, res) => {
  let activity = req.body || req.params
  let ret = await activityDao.releaseActivity(activity.activityId, activity.activityState)
  res.json({ code: 200, data: ret, msg: '发布成功' })
}
// 删除申请活动记录
exports.deleteApplyActivity = async (req, res) => {
  const apply = req.body || req.params
  // 撤销占用场地
  await areaDao.occupyArea(1, apply.areaId)
  // 撤销申请活动
  await activityDao.deleteApplyActivity(apply.applyId, apply.activityId)
  res.json({ code: 200, msg: '撤销成功' })
}
