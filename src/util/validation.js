function validation(type, value) {
  var cachePassword;
  if (type==="username") {
    if (value===""){
      return "用户名不能为空"
    }
    //用户名已经注册过
  }
  if (type==="password") {
    if (value===""){
      return "密码不能为空"
    }else if(value.length < 6) {
      return "密码不能少于6位"
    }else{
      cachePassword = value
    }
  }
  if (type==="comfirmPassword") {
    if (value !== cachePassword){
      return "两次密码不一致"
    }
  }
}



module.exports = validation;