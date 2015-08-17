var mongoose = require('mongoose');
var User = mongoose.model('User');
var userService = require('../services/user.service');

var logger = require('log4js').getLogger("user.ctrl");

/**
 * 注册用户
 */
exports.create = function (req, res, next) {
    logger.trace('>>>create');

    //TODO remove
    //req.body.username += (new Date).getTime();

    var user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    //TODO 验证，非空、trim、用户名邮箱唯一、过滤黑名单字符

    user.save(function (err, user) {
        err ? next(err) : res.json(user);
    });

    logger.trace('<<<create');
};

exports.login = function (req, res, next) {
    logger.trace('>>>login');

    //TODO 验证 非空 trim
    var password = req.body.password;
    var username = req.body.username;

    userService.authCheck(username, password, function (user) {
        //TODO 返回各种异常码和错误内容
        if (user) {
            //更新 session
            req.session.user = {id: user.id};
            res.json({error: 0});
        } else {
            res.json({error: 201});
        }
    });

    logger.trace('<<<login');
};

exports.validateUniqueUsername = function (req, res, next) {

};
