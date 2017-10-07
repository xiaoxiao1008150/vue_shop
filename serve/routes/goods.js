var express = require('express');
var router = express.Router();
var Good = require('../models/good');
var User = require('../models/user');
var Cart = require('../models/cart');

//http://localhost:3000/api/goods?page=1&pageSize=6&sort=1
router.get('/goods', function(req, res, next) {
  // 分页
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = req.query.sort;
  let priceLevel = req.query.priceLevel;
  let skip = (page -1) * pageSize;
  var params = {};
  var priceGt,
      priceLte;
  if(priceLevel !== 'all'){
    switch(priceLevel){
      case '0': priceGt = 0; priceLte = 100; break;
      case '1': priceGt = 101; priceLte = 500; break;
      case '2': priceGt = 501; priceLte = 1000; break;
      case '3': priceGt = 1001; priceLte = 5000; break;
    }
    params = {
      price:{
        $gt: priceGt,
        $lte: priceLte
      }
    };
  }

  let GoodsModel = Good.find(params).skip(skip).limit(pageSize);
  GoodsModel.sort({"price": sort});
  GoodsModel.exec(function (err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

router.post('/addCart', function(req, res, next) {
  var  goodId = req.body.goodId;
  // var userId = "59d2149676926f8489ea03ce";
  var userId = req.session.user._id;
  //已经添加过，需要更新商品的数量
  var flag = false;
  Cart.findOne({username:userId},function(err,user){
        if(err){
            return;
        }else if(user===null){
          var obj = {
              username: userId,
              carts:[{good: goodId, number:1}]
            };
            var newCart = new Cart(obj);
            newCart.save(function(err, newcart){
              if(err){
                return;
              }
              console.log('newcart===', newcart);
            });
            return;
        }

        var goodList = user.carts;
        goodList.forEach(function(item){
          var a = (item.good).toString();
          var b = goodId.toString();
          console.log("a==", a);
          console.log("b==", b);
          console.log("===", b===a);
          if(a===b){
            item.number++;
            flag = true;
          }
        });
        if(flag){//增加数量
          user.save(function(err,newcart){
            if(err){
              return;
            }
            console.log("newcart===",newcart);
          });
        }else{
          var newGood = {
            good:goodId, 
            number:1
          };
          user.carts.push(newGood);
          user.save(function(err, newcart){
            if(err){
              return;
            }
            // 返回给客户端的应该是populate之后的
          });
        }
      });

});

// 购物车页面
router.get('/addCart', function(req, res, next) {
  var userId = "59d2149676926f8489ea03ce";
  //找到所有的商品 放到购物车页面
  var userCartList = [];
  User.findById(userId)
      .populate('cartList.cart')
      .exec(function(err, user){
        if(err){
          console.log(err);
        }else{
         res.json({
            status:'0',
            msg:'',
            result:{
              count: user.cartList.length,
              list: user.cartList
            }
          });
        }
  });

});

router.post("/api/cartEdit", function(req,res,next){
  var userId = "59d2149676926f8489ea03ce";
  var goodId = req.body.goodId;
  var goodNum = req.body.goodNum;
  User.update({"userId":userId, "cartList.cart":goodId},
    { "cartList.$.cartList.number": goodNum},
    function(err,user){

    });
});


module.exports = router;