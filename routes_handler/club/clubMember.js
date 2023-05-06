// promise错误可以让app.js接收
require('express-async-errors')

// 引入数据操作
const memberDao = require('../../dao/club/ClubMemberDao')
const { getNowTime } = require('../../utils/myStr')

// 查询某个社团的所有成员
exports.clubIdAllMember = async (req, res) => {
  let member = req.body || req.params
  let ret = await memberDao.clubIdAllMember(member.clubId)
  res.json({ code: 200, data: ret })
}
// 添加社团成员
exports.addMember = async (req, res) => {
  let member = req.body || req.params
  member.joinTime = getNowTime()
  let ret = await memberDao.addMember(member)
  res.json({ code: 200, data: ret, msg: '添加成功' })
}
// 删除社团成员
exports.deleteMember = async (req, res) => {
  let member = req.body || req.params
  let ret = await memberDao.deleteMember(member.userId, member.clubId)
  res.json({ code: 200, data: ret, msg: '删除成功' })
}
