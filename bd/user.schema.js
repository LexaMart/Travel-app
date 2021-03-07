const {Schema, model} = require('mongoose');

const schema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  ratedSights: [{
    name: String,
  }],
})
module.exports = model('User', schema);