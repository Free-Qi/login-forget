/**
 * Created by dllo on 17/8/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('forget');
});

router.post('/', function (req, res) {
    var b1 = req.body.username;
    var b2 = req.body.old;
    var b3 = req.body.new;
    var b4 = req.body.again;
    //参数
    var myjson = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'NewB',
        connectionLimit: 15
    };
    var pool = mysql.createPool(myjson);
    pool.getConnection(function (error, connect) {
        var selectsql = `select *from user where username = '${b1}'`;
        connect.query(selectsql, function (error, result) {
            console.log(result);
            console.log(b2);
            if (result.length != 0) {
                if (result[0]['password'] === b2) {
                    console.log(b3, b4);
                    if (b3 === b4) {
                        var updetaSQL = `update user set password = '${b3}' where username = '${result[0]['username']}'`;
                        connect.query(updetaSQL, function (error) {
                            if (!error) {
                                res.send('修改成功')
                            }
                        })
                    } else {
                        res.send('两次密码不一致')
                    }

                } else {
                    res.send('原密码不对')
                }
            } else {
                res.send('用户名不存在')
            }

        })


    })


});


module.exports = router;