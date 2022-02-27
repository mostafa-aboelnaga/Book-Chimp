var express = require('express');
var router = express.Router();
const registerController = require('../controllers/register')

const checkLogged = (req, res, next) => {
    console.log("register", req.user);
    if (req.cookies.accessToken && req.cookies.accessToken != 'undefined'){
        console.log("redirecting");
        res.redirect('/home');
    }
    else {
        next();
    }
};

router.get('/', checkLogged, registerController.getRegister);

module.exports = router;
