var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// Good Schema
var CartSchema = new Schema({
  username: {type:ObjectId, ref:"User"},
  carts: [
    {
      good:{type:ObjectId, ref:"Good"},
      number: Number
    }
  ],
  createAt:{
    type:Date,
    default:Date.now()
  },
});


module.exports = mongoose.model('Cart', CartSchema);
