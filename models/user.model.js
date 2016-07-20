var mongoose = require('mongoose');
var crypto = require('crypto');
var EncyptUtils = require('../utils/EncryptUtils');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, trim: true, unique: true},
    password: String,
    email: String
});


UserSchema.pre('save',
    function(next) {
        if (this.password) {
            this.password = EncyptUtils.encyptPassword(this.password);
        }
        next();
    }
);

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne(
        {username: possibleUsername},
        function(err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};

mongoose.model('User', UserSchema)


module.exports = mongoose.model('User');



