const BaseDao = require('../BaseDao')

// 查看所有申请社团记录
const applyClubAll = () => {
  const sql =
    'select apply.*,club_id,club.user_id,user_name,phone,state from apply left join club on apply.apply_id = club.apply_id left join user on apply.apply_user = user.user_id'
  return BaseDao.execute(sql)
}
// 审核列表模糊查询
const searchApplyClub = (keywords) => {
  const sql =
    'select apply.*,user_name,phone,state from apply left join club on apply.apply_id = club.apply_id left join user on apply.apply_user = user.user_id\
    where CONCAT_WS("",apply.name,user_name,phone) REGEXP ?'
  const params = [keywords]
  return BaseDao.execute(sql, params)
}
// 查看当前用户有哪些申请社团记录
const userApplyClubAll = (userId) => {
  const sql =
    'select apply.*,user_name,phone,state from club left join apply on club.apply_id=apply.apply_id left join user on apply.apply_user=user.user_id where club.user_id = ?'
  const params = [userId]
  return BaseDao.execute(sql, params)
}
// 查看apply_id的申请社团记录
const applyIdApplyClub = (applyId) => {
  const sql =
    'select apply.*,club.*,user_name,phone,area_name,type_name from club left join apply on club.apply_id=apply.apply_id \
    left join user on apply.apply_user=user.user_id left join area on apply.area_id=area.area_id \
    left join club_type on club.type_id=club_type.type_id where club.apply_id = ?'
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
    {
      sql: 'insert into bear(bear_id,teacher_id,position) values(?,?,?)',
      params: [clubInfor.clubId, clubInfor.teacherId, clubInfor.position],
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
// 发布社团
const releaseClub = (applyId, state) => {
  const arr = [
    {
      sql: 'update club set state=? where apply_id=?',
      params: [state, applyId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除申请社团记录
const deleteApplyClub = (applyId, clubId) => {
  const arr = [
    {
      sql: 'delete from bear where bear_id=?',
      params: [clubId],
    },
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
// 查询用户的社团
const getUserClubs = (userId) => {
  const sql =
    'select * from club_member left join club on club_member.club_id=club.club_id \
   left join club_type on club.type_id=club_type.type_id where club_member.user_id=?'
  const params = [userId]
  return BaseDao.execute(sql, params)
}
module.exports = {
  applyClubAll,
  searchApplyClub,
  userApplyClubAll,
  applyIdApplyClub,
  addApplyClub,
  auditApplyClub,
  releaseClub,
  deleteApplyClub,
  getUserClubs,
}
