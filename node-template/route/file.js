const express = require('express');
const router = express.Router();

/**
 * 上传图片
 */
router.post('/upload', async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send({code: 200, msg: "上传成功",data:'http://localhost:9000/'+req.file.filename})
});

module.exports = router;