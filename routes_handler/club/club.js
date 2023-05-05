// promise错误可以让app.js接收
require('express-async-errors')

// 引入数据操作
const clubDao = require('../../dao/club/ClubDao')
const areaDao = require('../../dao/AreaDao')
// 生成16位UUID
const { uuid, getNowTime } = require('../../utils/myStr')

// 查看所有申请社团记录
exports.applyClubAll = async (req, res) => {
  let ret = await clubDao.applyClubAll()
  res.json({ code: 200, data: ret })
}
// 查看当前用户有哪些申请社团记录
exports.userApplyClubAll = async (req, res) => {
  let ret = await clubDao.userApplyClubAll(req.auth.userId)
  res.json({ code: 200, data: ret })
}
// 查看apply_id的申请社团记录
exports.applyIdApplyClub = async (req, res) => {
  let apply = req.body || req.params
  let ret = await clubDao.applyIdApplyClub(apply.applyId)
  res.json({ code: 200, data: ret })
}
// 提交申请社团记录
exports.addApplyClub = async (req, res) => {
  // 获取数据
  let clubApply = req.body || req.params
  // 添加数据
  clubApply.applyInfo.applyId = uuid()
  clubApply.applyInfo.applyTime = getNowTime()
  clubApply.clubInfor.clubId = uuid()
  // 判断场地是否可以用
  let flag = await areaDao.auditArea(clubApply.applyInfo.areaId)
  if (flag.length > 0) {
    res.json({ code: 3200, flag, msg: '场地已经被使用，请更换' })
  } else {
    // 占用场地
    const area = await areaDao.occupyArea(2, clubApply.applyInfo.areaId)
    // 执行申请社团
    const club = await clubDao.addApplyClub(clubApply.applyInfo, clubApply.clubInfor, req.auth)
    // 返回执行
    res.json({ code: 200, data: { area, club }, msg: '添加成功' })
  }
}
// 审核申请社团
exports.auditApplyClub = async (req, res) => {
  let apply = req.body || req.params
  // 记录时间
  apply.replyTime = getNowTime()
  let ret = await clubDao.auditApplyClub(apply)
  res.json({ code: 200, data: ret, msg: '审核成功' })
}

// 删除申请社团记录
exports.deleteApplyClub = async (req, res) => {
  const apply = req.body || req.params
  // 撤销占用场地
  await areaDao.occupyArea(1, apply.areaId)
  // 撤销申请社团
  await clubDao.deleteApplyClub(apply.applyId)
  res.json({ code: 200, msg: '撤销成功' })
}
