const bcrypt = require('bcryptjs');

function hashPassword(pasword){
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(pasword, salt);
    return hash;
}

function checkPassword(password, hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    checkPassword
}