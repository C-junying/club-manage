function menuTree(arr) {
  let tree = arr.filter((item) => {
    if (item['parent_id'] == null || item['parent_id'] == undefined) {
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
module.exports = { menuTree }
