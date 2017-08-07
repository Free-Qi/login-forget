/**
 * Created by dllo on 17/8/7.
 */
/**
 * Created by dllo on 17/8/5.
 */
var express = require('express');
var mysql = require('mysql');
//操作error的函数
function handError(message, error) {
    if (error) {
        console.log(message + '失败');
        console.log(error);
        return false
    } else {
        console.log(message + '成功');
        return true
    }
}
var router = express.Router();




router.post('/', function (req, res) {
//获取传进来的username和password
    var a1 = req.body.username;
    var a2 = req.body.password;


//参数
    var myjson = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database:'NewB',
        connectionLimit:15
    };
    var pool = mysql.createPool(myjson);
     pool.getConnection(function (error,connect) {

     //查询
         var selSQL = `select *from user where username='${a1}'`;

       connect.query(selSQL,function (error,result) {
           if(! handError('查询',error)){
              return ;
           }
           if(result.length!=0){
              if(result[0]['password']===a2){
                  res.send('登录成功')
              }else{
                  res.send('密码错误')
               }
           }else {
               res.send('用户不存在')
           }

       })




     })
});
module.exports = router;