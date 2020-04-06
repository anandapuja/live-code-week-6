const { User, Food } = require('../models');
const jwt = require('jsonwebtoken');
const checkPass = require('../helpers/bcrypt').checkPassword;

class Controller {
    static register(req,res){
        const reqbody = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(reqbody)
        .then( data => {
            console.log(data)
            res.status(201).json({
                id: data.id,
                email: data.email
            })
        }).catch( err => {
            console.log(err);
        });
    }
    static login(req,res){
        console.log(req.body)
        const reqbody = {
            email: req.body.email,
            password: req.body.password
        };
        User.findOne({
            where: {
                email: reqbody.email
            }
        }).then( data => {
            if( data === null ){
                res.status(404).json({ message: 'data not found'})
            } else {
                if(checkPass(reqbody.password, data.password)){
                    console.log('TRUE')
                    const userLogin = {
                        UserId: data.id,
                        email: data.email
                    }
                    const access_token = jwt.sign({ userLogin }, process.env.JWT_SECRET);
                    res.status(200).json({
                        access_token: access_token
                    })
                } else {
                    res.status(404).json({ message: 'username/ password invalid'})
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
    static foods(req,res){
        console.log('>>>>>>', req.UserId)
        const reqbody = {
            title: req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            UserId: req.UserId
        }
        console.log('>>> reqbody',reqbody);
        Food.create(reqbody)
        .then( data => {
            res.status(201).json({
                data
            })
        })
    }
}

module.exports = Controller;