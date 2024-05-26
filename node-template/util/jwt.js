const jwt = require("jsonwebtoken");

const jwtSecret = "node-template";

exports.signToken = (userId, username) => {
    return jwt.sign({userId, username}, jwtSecret, {expiresIn: "1d"});
};
exports.getToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({error: "token为空"});
        } else {
            const info = jwt.verify(token, jwtSecret);
            resolve(info); 
        }
    });
};