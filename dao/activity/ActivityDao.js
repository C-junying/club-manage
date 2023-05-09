const BaseDao = require('../BaseDao')

// 查看所有申请活动记录
const applyActivityAll = () => {
  const sql =
    'select apply.*,club_name,activity.*,user_name,phone \
      from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
      left join user on apply.apply_user = user.user_id'
  return BaseDao.execute(sql)
}
// 审核列表模糊查询
const searchApplyActivity = (keywords) => {
  const sql =
    'select apply.*,club_name,activity.*,user_name,phone \
    from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
    left join user on apply.apply_user = user.user_id where CONCAT_WS("",apply.name,club_name,user_name,phone) REGEXP ?'
  const params = [keywords]
  return BaseDao.execute(sql, params)
}
// 查看当前社团有哪些活动申请
const clubApplyActivityAll = (clubId) => {
  const sql =
    'select apply.*,club_name,activity.*,user_name,phone \
    from activity left join apply on activity.apply_id = apply.apply_id left join club on activity.club_id=club.club_id\
    left join user on apply.apply_user = user.user_id where activity.club_id=?'
  const params = [clubId]
  return BaseDao.execute(sql, params)
}
// 查看activity_id的申请活动记录
const activityIdApplyActivity = (activityId) => {
  const sql =
    'select apply.*,activity.*,club_name,user_name,phone,area_name,type_name from activity left join apply on activity.apply_id=apply.apply_id \
      left join club on activity.club_id=club.club_id left join user on apply.apply_user=user.user_id left join area on apply.area_id=area.area_id \
      left join activity_type on activity.type_id=activity_type.type_id where activity.activity_id = ?'
  const params = [activityId]
  return BaseDao.execute(sql, params)
}
// 提交申请活动
const addActivityApply = (applyInfo, activityInfor, user) => {
  const arr = [
    {
      sql: 'insert into apply(apply_id,area_id,apply_user,name,apply_content,apply_time,apply_state) values(?,?,?,?,?,?,?)',
      params: [
        applyInfo.applyId,
        applyInfo.areaId,
        user.userId,
        activityInfor.activityTitle,
        applyInfo.applyContent,
        applyInfo.applyTime,
        applyInfo.applyState,
      ],
    },
    {
      sql: 'insert into activity(activity_id,apply_id,type_id,club_id,activity_title,picture,activity_intro,\
        activity_content,start_time,end_time,money,activity_look,activity_state) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
      params: [
        activityInfor.activityId,
        applyInfo.applyId,
        activityInfor.typeId,
        activityInfor.clubId,
        activityInfor.activityTitle,
        activityInfor.picture,
        activityInfor.activityIntro,
        activityInfor.activityContent,
        activityInfor.startTime,
        activityInfor.endTime,
        activityInfor.money,
        activityInfor.activityLook,
        activityInfor.activityState,
      ],
    },
    {
      sql: 'insert into bear(bear_id,teacher_id,bear_name) values(?,?,?)',
      params: [activityInfor.activityId, activityInfor.teacherId, activityInfor.bearName],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 审核申请活动
const auditApplyActivity = (applyActivity) => {
  const arr = [
    {
      sql: 'update apply set apply_state=?,reply=?,reply_time=? where apply_id=?',
      params: [applyActivity.applyState, applyActivity.reply, applyActivity.replyTime, applyActivity.applyId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 发布活动
const releaseActivity = (activityId, state) => {
  const arr = [
    {
      sql: 'update activity set activity_state=? where activity_id=?',
      params: [state, activityId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除申请社团记录
const deleteApplyActivity = (applyId, activityId) => {
  const arr = [
    {
      sql: 'delete from bear where bear_id=?',
      params: [activityId],
    },
    {
      sql: 'delete from activity where activity_id=?',
      params: [activityId],
    },
    {
      sql: 'delete from apply where apply_id=?',
      params: [applyId],
    },
  ]
  return BaseDao.execTransection(arr)
}
module.exports = {
  applyActivityAll,
  searchApplyActivity,
  activityIdApplyActivity,
  clubApplyActivityAll,
  addActivityApply,
  auditApplyActivity,
  releaseActivity,
  deleteApplyActivity,
}
