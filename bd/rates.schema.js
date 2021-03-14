const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  rate: {
    type: Number,
    require: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  userName : {
    type: String,
    require: true
  }
})
module.exports = model('Rates', schema);