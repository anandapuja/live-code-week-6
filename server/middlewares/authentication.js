const jwt = require('jsonwebtoken');

function checkAuth(req,res,next){
    const decode = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);
    console.log(decode)
    req.UserId = decode.userLogin.UserId;
    console.log('>>>>>>>',req.UserId);
    next();
    return decode
}

module.exports = checkAuth;