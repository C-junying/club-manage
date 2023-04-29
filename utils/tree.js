function menuTree(arr) {
  let tree = arr.filter((item) => {
    if (item['parent_id'] == null || item['parent_id'] == undefined || item['parent_id'] == '') {
      return true
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]['menu_id'] === item['parent_id']) {
          arr[i].menus = arr[i].menus || []
          arr[i].menus.push(item)
        }
      }
    }
  })
  return tree
}
function menuSortTree(arr) {
  // 对整体排序
  arr.sort((a, b) => b.sort - a.sort)
  // 再对儿子排序
  arr.forEach((val) => {
    if (val.menus != undefined && val.menus != null) {
      val.menus.sort((a, b) => b.sort - a.sort)
    }
  })
}
function menuOrderTree(arr) {
  let tree = menuTree(arr)
  menuSortTree(tree)
  return tree
}
module.exports = { menuOrderTree }
