var crypto = require('crypto');

module.exports.encyptPassword = function (clearText) {
    var md5 = crypto.createHash('md5');
    return md5.update(clearText).digest('hex');
};
