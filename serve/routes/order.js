var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// Good Schema
var OrderSchema = new Schema({
  user: {type: ObjectId, ref: 'User'},
  orderList:[
    {
      cart:{type: ObjectId, ref: 'Good'},
      number: Number,
    }
  ]
});

module.exports = mongoose.model('Order', OrderSchema);
