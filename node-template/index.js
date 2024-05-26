const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const Jwt = require("./util/jwt");
const login = require("./route/login");
const register = require("./route/register");
const user = require("./route/user");
const file = require("./route/file");

//挂载参数处理的中间件
//extended:false 表示使用系统模块querystring来处理 将字符串转化为对象
//Post请求中间件，bodyParser.json将前端发来的json对象解析
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//挂载内置中间件处理静态文件
app.use(express.static("public"));

//上传文件中间件
var filestorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        // cb(null, "[maues]-" + file.originalname);
        cb(null, file.originalname);
    },
    fileFilter(req, file, cb) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(req.file.originalname, "latin1").toString(
            "utf8"
        );
    },
});

var upload = multer({
    storage: filestorageEngine,
});

// express框架解决跨域问题的代码，注意该代码要放在 app.use(router)之前
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization,Token,Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//拦截器
app.use((req, res, next) => {
    const url = req._parsedUrl.pathname; // 获取当前访问的api地址
    console.log(url);
    // 不需要进行验证的api，白名单
    const urlArr = ["/api/login", "/api/register"];
    if (urlArr.indexOf(url) >= 0) {
        next();
        console.log("放行");
        return false;
    }
    let token = req.headers["token"];
    Jwt.getToken(token)
        .then((data) => {
            // 解析正确
            res.data = data;
            req.body.user_id = data.userId
            next();
        })
        .catch((error) => {
            console.log(error);
            res.send({err: 401, msg: "token信息不存在或已过期"});
        });
});

app.use("/api", login);
app.use("/api", register);
app.use("/api", user);
app.use("/api", file);

var server = app.listen(9000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
