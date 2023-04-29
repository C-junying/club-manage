// promise错误可以让app.js接收
require('express-async-errors')

exports.headPikture = (req, res) => {
  var file = req.file
  //   console.log('文件类型：%s', file.mimetype)
  //   console.log('原始文件名：%s', file.originalname)
  //   console.log('文件大小：%s', file.size)
  //   console.log('文件保存路径：%s', file.path)
  console.log(file)
  res.json({ code: 200, data: { file, img: `http://localhost:8080/images/head/${file.originalname}` } })
}
