var userCtrl = require('../controllers/user.ctrl');

module.exports = function (router) {

    router.route('/users')
        .post(userCtrl.create);//注册创建用户


    router.post('/login', userCtrl.login)

    router.get('/users/valid-unique-username/:username', userCtrl.validateUniqueUsername);
};