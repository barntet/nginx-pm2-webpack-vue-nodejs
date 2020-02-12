const express = require("express");

const app = express()

app.use(express.urlencoded({extended:true}));  //获取表单数据类型
app.use(express.json());    //获取json数据类型

app.post('/login',(req,res)=>{
    if(req.body.username == 'admin' && req.body.password == 123){
        res.send('你好,登录成功');
        console.log(req.body)
    }else{
        res.send('账号或者密码输入错误')
    }
})


app.listen(8000,err=>{
    !err && console.log(8000)
})
app.listen(7000,err=>{
    !err && console.log(7000)
})
app.listen(6000,err=>{
    !err && console.log(6000)
})