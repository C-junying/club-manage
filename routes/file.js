const express = require('express')
var router = express.Router()

var { uploadHead, uploadClubType } = require('../dao/FileDao')
// 导入路由处理函数
const fileHandle = require('../routes_handler/file')
// 头像上传
router.post('/uploadHead', uploadHead.single('file'), fileHandle.uploadHead)
// 社团类型图上传
router.post('/uploadClubType', uploadClubType.single('file'), fileHandle.uploadClubType)

module.exports = router
