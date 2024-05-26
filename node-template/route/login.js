const express = require('express');
const router = express.Router();
const User = require("../models/user.model")
const {signToken} = require("../util/jwt")

/**
 * 登录
 */
router.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({
        where: {
            username: username,
            password: password,
            status : 1
        }
    });
    if (user != null) {
        const token = signToken(user.id, user.username);
        await User.update({
            token:token
        },{
            where:{
                id:user.id
            }
        });
        const userInfo = await User.findOne({
            where: {
                username: username,
                password: password
            }
        })
        res.send({code: 200, msg: "登录成功", data: userInfo})
    } else {
        res.send({code: 200, msg: "账号或密码错误"})
    }

});

module.exports = router;