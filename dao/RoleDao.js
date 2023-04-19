const BaseDao = require('./BaseDao')

// 查询所有角色
const roleList = () => {
    const sql = "select * from role";
    return BaseDao.execute(sql);
}
// 查询角色总数
const getroleCount = () => {
    const sql = "SELECT count(*) as count FROM role";
    return BaseDao.execute(sql);
}
// 查询所有角色,分页
const rolePageList = (page) => {
    const sql = "select * from role limit ?,?";
    const params = [(page.pageNum - 1) * page.pageSize, page.pageSize];
    return BaseDao.execute(sql, params);
}
// 对角色名，备注模糊查询
const getSearch = (keywords) => {
    const sql = "select * from role where CONCAT(roleName,remark) like ?";
    const params = ["%" + keywords.search + "%"];
    return BaseDao.execute(sql, params);
}
// 添加角色
const addRole = (role) => {
    const arr = [
        {
            sql: "insert into role(roleName,remark) values(?,?)",
            params: [role.roleName, role.remark]
        }
    ];
    if (role.roleMenuArr.length > 0) {
        arr.push({
            sql: `insert into role_menu(roleId,menuId) values ?`,
            params: [role.roleMenuArr]
        })
    }
    return BaseDao.execTransectionByReturnId(arr);
}
// 修改角色信息
const updateRole = (role) => {
    const arr = [
        {
            sql:"update role set roleName=?,remark=? where roleId=?",
            params : [role.roleName, role.remark, role.roleId]
        },
        {
            sql: "delete from role_menu where roleId=?",
            params: [role.roleId]
        },
    ];
    if (role.roleMenuArr.length > 0) {
        arr.push({
            sql: `insert into role_menu(roleId,menuId) values ?`,
            params: [role.roleMenuArr]
        })
    }
    return BaseDao.execTransection(arr);
}
// 删除角色
const deleteRole = (role) => {
    const arr = [
        {
            sql: "update user_role set roleId=null where roleId=?",
            params: [role.roleId]
        },
        {
            sql: "delete from role_menu where roleId=?",
            params: [role.roleId]
        },
        {
            sql: "delete from role where roleId=?",
            params: [role.roleId]
        }
    ]
    return BaseDao.execTransection(arr);
}
// 分配角色权限
const shareRolePower = (role) => {
    const temp = role.roleMenuIdArr.map((val) => {
        return [role.roleId, val];
    });
    const arr = [
        {
            sql: "delete from role_menu where roleId=?",
            params: [role.roleId]
        },
        {
            sql: `insert into role_menu(roleId,menuId) values ?`,
            params: [temp]
        }
    ]
    return BaseDao.execTransection(arr);
}
module.exports = { roleList, getroleCount, rolePageList, getSearch, addRole, updateRole, deleteRole, shareRolePower };