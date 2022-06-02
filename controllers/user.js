const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    create: function(req, res, next) {

        userModel.create({ userName: req.body.userName, email: req.body.email, password: req.body.password }, function (err, result) {
            if (err)
                next(err);
            else
                res.render('login');

        });
    },
    authenticate: function(req, res, next) {
        console.log(req.body.userName)
        userModel.findOne({userName:req.body.userName}, function(err, userInfo){
            console.log(userInfo)
            if (err) {
                next(err);
            } else {
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.render('index');
                }else{
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
        });
    },
}