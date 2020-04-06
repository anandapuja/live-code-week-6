const { Food } = require('../models');

function authorization(req,res,next){
    Food.findByPk(Number(req.params.id))
    .then( data => {
        if(data.UserId === req.UserId){
            next();
        } else {
            res.status(400).json({
                message: "Bad request"
            })
        }
    }).catch( err => {
        console.log(err);
    })
}

module.exports = authorization;