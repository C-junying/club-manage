const express = require('express')
var router = express.Router()

var upload = require('../dao/FileDao')
// 导入路由处理函数
const fileHandle = require('../routes_handler/file')
// 头像上传
router.post('/upload', upload.single('file'), fileHandle.headPikture)

module.exports = router
