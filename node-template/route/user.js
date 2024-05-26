const express = require('express');
const router = express.Router();
const mysql_Sequelize = require("../config/db");
const User = mysql_Sequelize.User;
const Op = mysql_Sequelize.Sequelize.Op;

/**
 * 获取用户信息
 */
router.post('/user/info', async (req, res) => {
    const {user_id} = res.body
    const user = await User.findOne({where: {id: user_id}});
    res.send({code: 200, data: user})
});

/**
 * 更新用户信息
 */
router.post('/user/update', async (req, res) => {
    const {username, password, phone, mail, avatar, user_id} = req.body
    console.log(req.body)
    let updateObj = {
        username: username,
        password: password,
        phone: phone,
        mail: mail,
        avatar: avatar
    }
    await User.update(updateObj, {where: {id: user_id}});
    res.send({code: 200, msg: "更新成功"})
});

module.exports = router;