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
  region: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
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
  currencies: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  }
});

module.exports = model('Country', schema);
