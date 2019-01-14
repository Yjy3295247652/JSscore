let express = require('express');
let app = express();
let admin = require('./router/admin');
let index = require("./router/index");

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.set('views','./views');            // 设置模板引擎的位置
app.use(express.static('public'));    // 托管静态文件  （用来路径引用）
app.use(express.static('uploads'));    // 托管静态文件  （用来路径引用）
app.set('view engine','ejs');         // 引用 ejs 模板引擎

app.use('/admin',admin);
app.use('/index',index);

app.listen(3004,function () {
    console.log('http://localhost:3004');
});
