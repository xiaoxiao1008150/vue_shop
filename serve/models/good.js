var mongoose = require('mongoose');

// Good Schema
var GoodSchema = mongoose.Schema({
  pid: String,
  name: String,
  price: Number,
  imgUrl: String
});

module.exports = mongoose.model('Good', GoodSchema);
