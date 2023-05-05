const BaseDao = require('../BaseDao')

// 查看所有申请社团记录
const applyClubAll = () => {
  const sql =
    'select apply.*,user_name,phone from apply left join club on apply.apply_id = club.apply_id left join user on apply.apply_user = user.user_id'
  return BaseDao.execute(sql)
}
// 查看当前用户有哪些申请社团记录
const userApplyClubAll = (userId) => {
  const sql =
    'select apply.*,user_name,phone from club left join apply on club.apply_id=apply.apply_id left join user on apply.apply_user=user.user_id where club.user_id = ?'
  const params = [userId]
  return BaseDao.execute(sql, params)
}
// 查看apply_id的申请社团记录
const applyIdApplyClub = (applyId) => {
  const sql =
    'select apply.*,club.*,user_name,phone from club left join apply on club.apply_id=apply.apply_id left join user on apply.apply_user=user.user_id where club.apply_id = ?'
  const params = [applyId]
  return BaseDao.execute(sql, params)
}
// 提交申请社团
const addApplyClub = (applyInfo, clubInfor, user) => {
  const arr = [
    {
      sql: 'insert into apply(apply_id,area_id,apply_user,name,apply_content,apply_time,apply_state) values(?,?,?,?,?,?,?)',
      params: [
        applyInfo.applyId,
        applyInfo.areaId,
        user.userId,
        clubInfor.clubName,
        applyInfo.applyContent,
        applyInfo.applyTime,
        applyInfo.applyState,
      ],
    },
    {
      sql: 'insert into club(club_id,apply_id,type_id,user_id,club_name,picture,club_intro,club_content) values(?,?,?,?,?,?,?,?)',
      params: [
        clubInfor.clubId,
        applyInfo.applyId,
        clubInfor.typeId,
        user.userId,
        clubInfor.clubName,
        clubInfor.picture,
        clubInfor.clubIntro,
        clubInfor.clubContent,
      ],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 审核申请社团
const auditApplyClub = (applyClub) => {
  const arr = [
    {
      sql: 'update apply set apply_state=?,reply=?,reply_time=? where apply_id=?',
      params: [applyClub.applyState, applyClub.reply, applyClub.replyTime, applyClub.applyId],
    },
  ]
  return BaseDao.execTransection(arr)
}

// 删除申请社团记录
const deleteApplyClub = (applyId) => {
  const arr = [
    {
      sql: 'delete from club where apply_id=?',
      params: [applyId],
    },
    {
      sql: 'delete from apply where apply_id=?',
      params: [applyId],
    },
  ]
  return BaseDao.execTransection(arr)
}
module.exports = {
  applyClubAll,
  userApplyClubAll,
  applyIdApplyClub,
  addApplyClub,
  auditApplyClub,
  deleteApplyClub,
}
