var EncyptUtils = require('../utils/EncryptUtils');
var logger = require('log4js').getLogger("user.service");


var User = require('mongoose').model('User');


/**
 *
 *  判断该用户名密码是否在数据库中
 * @param username
 * @param password
 * @param callback function (user) {}
 */
exports.authCheck = function (username, password, callback) {
    logger.trace('>>>authCheck');

    //TODO 抛出错误
    User.findOne({username: username}, function (err, user) {
        logger.trace('>>>User.findOne callback the user is', user);
        if(!err && user && user.password == EncyptUtils.toMd5(password)) {
            callback(user);
        }else {
            callback(null);
        }
    });

    logger.trace('<<<authCheck');
};
