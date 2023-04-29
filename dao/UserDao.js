const BaseDao = require('./BaseDao')
//查询所有⽤户
const queryAll = () => {
  const sql =
    'SELECT DISTINCT u.*,r.* from user u LEFT JOIN play_role ur on u.user_id = ur.user_id LEFT JOIN role r on ur.role_id = r.role_id'
  return BaseDao.execute(sql)
}
// 查询用户总数
const getCount = () => {
  const sql = 'SELECT count(*) as count FROM user'
  return BaseDao.execute(sql)
}
// 分页查询
const getListByPage = (pageNum, pageSize) => {
  const sql =
    'SELECT DISTINCT u.*,r.* from user u LEFT JOIN play_role ur on u.user_id = ur.user_id LEFT JOIN role r on ur.role_id = r.role_id ORDER BY u.user_id limit ?,?'
  const params = [(pageNum - 1) * pageSize, pageSize]
  return BaseDao.execute(sql, params)
}
//登录
const login = (user) => {
  const sql =
    'SELECT DISTINCT u.*,r.* from user u LEFT JOIN play_role ur on u.user_id = ur.user_id LEFT JOIN role r on ur.role_id = r.role_id where u.email=?||u.phone=?||u.user_id=?'
  const params = [user.email, user.phone, user.userId]
  return BaseDao.execute(sql, params)
}
// 注册
const register = (user) => {
  if (user.roleId === undefined || user.roleId === '') {
    user.roleId = '202304191414070004'
  }
  const arr = [
    {
      sql: 'insert into user(user_id,password,nickname,user_name,sex,phone, email,picture,intro, regist_time) values(?,?,?,?,?,?,?,?,?,?)',
      params: [
        user.userId,
        user.password,
        user.nickname,
        user.userName,
        user.sex,
        user.phone,
        user.email,
        user.picture,
        user.intro,
        user.createTime,
      ],
    },
    {
      sql: 'insert into play_role(user_id,role_id) values(?,?)',
      params: [user.userId, user.roleId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 删除用户
const deleteUser = (user) => {
  const arr = [
    {
      sql: 'delete from play_role where user_id = ?',
      params: [user.userId],
    },
    {
      sql: 'delete from user where user_id = ?',
      params: [user.userId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 修改密码
const updatePassword = (user) => {
  const arr = [
    {
      sql: 'update user set password=? where user_id=?',
      params: [user.password, user.userId],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 编辑用户
const updateUser = (user) => {
  const arr = [
    {
      sql: 'update user set password=?,nickname=?,user_name=?,sex=?,phone=?,email=?,picture=?,intro=?,regist_time=? where user_id=?',
      params: [
        user.password,
        user.nickname,
        user.userName,
        user.sex,
        user.phone,
        user.email,
        user.picture,
        user.intro,
        user.createTime,
        user.userId,
      ],
    },
    {
      sql: 'delete from play_role where user_id = ?',
      params: [user.userId],
    },
    {
      sql: 'insert into play_role(user_id,role_id,remark) values(?,?,?)',
      params: [user.userId, user.roleId, null],
    },
  ]
  return BaseDao.execTransection(arr)
}
// 对用户模糊查询
const getSearch = (keywords) => {
  const sql = 'select * from user where CONCAT_WS(nickname,user_name,phone,email) REGEXP ?'
  const params = [keywords]
  return BaseDao.execute(sql, params)
}
module.exports = {
  queryAll,
  getCount,
  getListByPage,
  login,
  register,
  deleteUser,
  updatePassword,
  updateUser,
  getSearch,
}
