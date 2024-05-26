const express = require('express');
const router = express.Router();
const User = require("../models/user.model")

/**
 * 注册
 */
router.post('/register', async (req, res) => {
    const {username, password} = req.body
    console.log(username);
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if(user!=null){
        res.send({code: 500, msg: "账号已存在"})
        return
    }
    await User.create({username:username,password:password,status:1});
    res.send({code: 200, msg: "注册成功"})
});

module.exports = router;