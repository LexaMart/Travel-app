const express = require('express');
const mongoose = require('mongoose');
const { get } = require('request');
const request = require('request');
const { count } = require('./bd/country.schema');


const app = express();
const PORT = process.env.PORT ?? 8080;
const Country = require('./bd/country.schema');

app.get('/api/countryList', async (req,res) => {
  try {
    const countries = await Country.find();
    if(!countries) {
      res.status(404).json({message: 'API error'})
    }
    const response = countries.map(el => {
      return {
        name: el.name,
        capital: el.capital,
        flag: el.flag,
        id: el.id
      }
    })
    res.status(200).json({response});
  }catch (e) {
    console.log(e)
  }
}) 



async function start() {
  try {
    await mongoose.connect('mongodb+srv://LexaMart:1q2w3e@cluster0.kaxpd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    // console.log(await Country.findOne({ name: 'France' }));
    app.listen(PORT, () => {
      console.log(`Serve is started on PORT ${PORT}`);
    });
    
  } catch (e) {
    console.log(e);
  }
}

start();
