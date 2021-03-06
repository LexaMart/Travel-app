const { Schema, model } = require('mongoose');

const schema = new Schema ({
  name: {
    type: String,
    required: true
  },
  capital: {
    type: String,
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
    name: String,
    description: String,
    photo: String,    
  }],
  video: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  }
  
});

module.exports = model('Countries', schema);
