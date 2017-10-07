var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var User = require('../models/user');
var Cart = require('../models/cart');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/captcha', function(req, res, next) {
    var captcha = svgCaptcha.create();
    // req.session.captcha = captcha.text;
    // console.log('text===',captcha.text);//实际的4位数字
    // console.log('data===',captcha.data);//svg路径，可以渲染成4位数字
    res.type('svg');
    res.status(200).json({
      captchaData: captcha.data,
      captchaText: captcha.text
    });
});


router.post('/register', function(req, res, next) {
  var userObj  = req.body;
  var obj = {
    name: userObj.username,
    password: userObj.password
  };
  var newUser = new User(obj);
  newUser.save(function(err,newuser){
    if(err){
      res.json({
        status: 1,
        msg: "用户创建失败"
      });
    } else {
      // res.redirect('/')
    }

  });
});
router.post('/login', function(req, res, next) {
  var userObj = req.body;
  User.findOne({name:userObj.loginUsername}, function(err,user){
    if(err){
      res.json({
        status: 1,
        msg: "登录失败"
      });
    }else {
      req.session.user = user;
      res.json({
        user:user
      });
      // res.redirect('/');
    }

  });
});

router.get("/addCart", function(req,res,next){
  // 根据 session中的用户id 找到用户的所有购物车的商品
  var userId = req.session.user._id;
  Cart.findOne({username: userId})
      .populate('carts.good')
      .exec(function(err,doc){
        if(err){
          return;
        }
        res.json({
          carts: doc.carts
        });
      });

});


module.exports = router;
