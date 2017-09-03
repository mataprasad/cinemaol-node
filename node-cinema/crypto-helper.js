var crypto = require('crypto');
var common = require('./common');

function encrypt(text) {
    var cipher = crypto.createCipher(common.config.crypto_algorithm,
        common.config.crypto_password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(common.config.crypto_algorithm,
        common.config.crypto_password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

//var hw = encrypt("hello world")
// outputs hello world
//console.log(decrypt(hw));

exports.encrypt = function(text) {
    return encrypt(text);
};

exports.decrypt = function(text) {
    return decrypt(text);
};