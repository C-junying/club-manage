const BaseDao = require('./BaseDao')

//通过roleId获取菜单列表
const queryByRoleId = (user) => {
    const sql = "SELECT role_menu.roleId,menu.* FROM role_menu,menu\
    where role_menu.menuId = menu.menuId and role_menu.roleId = ?";
    const params = [user.roleId];
    return BaseDao.execute(sql, params);
}
// 查询菜单总数
const getCount = () => {
    const sql = "SELECT count(*) as count FROM menu";
    return BaseDao.execute(sql);
}
// 获取菜单所有菜单
const roleSelect = () => {
    const sql = "select * from menu";
    return BaseDao.execute(sql);
}
// 获取菜单列表,分页
const getListByPage = (page) => {
    const sql = "select * from menu limit ?,?";
    const params = [(page.pageNum - 1) * page.pageSize, page.pageSize];
    return BaseDao.execute(sql, params);
}
// 获取所有一级二级菜单
const queryAll = () => {
    const sql = "select * from menu where menuType=0";
    return BaseDao.execute(sql);
}
// 对菜单ID，菜单名称，菜单路径模糊查询
const getSearch = (keywords) => {
    const sql = "select * from menu where CONCAT(menuId,menuName,menuUrl) like ?";
    const params = ["%" + keywords.search + "%"];
    return BaseDao.execute(sql, params);
}
// 添加菜单
const addMenu = (menu) => {
    const arr = [
        {
            sql: "insert into menu(pId,menuName,menuUrl,menuSrc,menuType,menuLogo,sort) values(?,?,?,?,?,?,?)",
            params: [menu.pId, menu.menuName, menu.menuUrl, menu.menuSrc, menu.menuType, menu.menuLogo, menu.sort]
        },
        {
            sql: "insert into role_menu(roleId,menuId) values(1,?)",
            params: [menu.menuId]
        }
    ];
    return BaseDao.execTransectionByReturnId(arr);
}
// 编辑菜单
const updateMenu = (menu) => {
    const sql = "update menu set pId=?,menuName=?,menuUrl=?,menuSrc=?,menuType=?,menuLogo=?,sort=? where menuId=?";
    const params = [menu.pId, menu.menuName, menu.menuUrl, menu.menuSrc, menu.menuType, menu.menuLogo, menu.sort, menu.menuId];
    return BaseDao.execTransection([{ sql, params }]);
}
// 删除菜单
const deleteMenu = (menu) => {
    const arr = [
        {
            sql: "delete from role_menu where menuId=?",
            params: [menu.menuId]
        },
        {
            sql: "delete from menu where menuId=?",
            params: [menu.menuId]
        }
    ];
    return BaseDao.execTransection(arr);
}
module.exports = { roleSelect, queryAll, queryByRoleId, getCount, getListByPage, getSearch, addMenu, updateMenu, deleteMenu };