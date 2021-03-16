const { Schema, model } = require('mongoose');

const schema = new Schema ({
  name: {
    type: Array,
    required: true
  },
  capital: {
    type: Array,
    required: true, 
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  currencies: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    require: true
  },
  sights: [{
    name: Array,
    description: Array,
    photo: String,    
  }],
  video: {
    type: String,
    require: true,
  },
  description: {
    type: Array,
    require: true,
  },
  cardBG: {
    type: String,
    require: true,
  }
});

module.exports = model('countries', schema);
