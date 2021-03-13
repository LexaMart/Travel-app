const config = require('config');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const request = require('request-promise');
const Country = require('../bd/country.schema');
const User = require('../bd/user.schema');
const Rate = require('../bd/rates.schema');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    if (!countries) {
      res.status(404).json({ message: 'API error' })
    }
    const response = countries.map(el => {
      return {
        name: el.name,
        capital: el.capital,
        flag: el.flag,
        cardBG: el.cardBG,
        id: el.id,
      }
    })
    res.status(200).json({ response });
  } catch (e) {
    console.log(e)
  }
})

router.get('/country', async (req, res) => {
  try {
    const id = req.query.id
    if (!id) return res.status(400).json({ message: 'Bad country ID' })
    const country = await Country.findById(id)
    if (!country) {
      return res.status(404).json({ message: 'Country not found' })
    }
    let weather = null;
    await request(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${config.get('OWM')}&units=metric`, (err, res, body) => {
      const weatherData = JSON.parse(body)
      weather = {
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        icon: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
        temp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
      }
    })
    let currentCurrencies = null;
    await request(`https://currate.ru/api/?get=rates&pairs=USD${country.currencies},EUR${country.currencies},RUB${country.currencies}&key=${config.get('currencies')}`, (err, res, body) => {
      const fetched = JSON.parse(body);
      currentCurrencies = {};
      for (let key in fetched.data) {
        const currency = key.slice(0, 3)
        if (country.currencies === "USD" || country.currencies === "EUR" || country.currencies === "RUB") {
          currentCurrencies[country.currencies] = 1;
        }
        switch (currency) {
          case "USD":
            console.log(typeof fetched.data[key]);
            currentCurrencies.USD = (+fetched.data[key]).toFixed(2)
            break;
          case "EUR":
            currentCurrencies.EUR = (+fetched.data[key]).toFixed(2)
            break;
          case "RUB":
            currentCurrencies.RUB = (+fetched.data[key]).toFixed(2)
            break;
          default:
            break;
        }
      }
    })
    console.log(currentCurrencies);
    res.status(200).json({
      weather: weather,
      name: country.name,
      capital: country.capital,
      lat: country.lat,
      lng: country.lng,
      language: country.language,
      currency: country.currencies,
      timezone: country.timezone,
      sights: country.sights,
      video: country.video,
      countryBg: country.cardBG,
      description: country.description,
      timezone: country.timezone,
      currentCurrencies,
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/sight/rate', async (req, res) => {
  try {

    const rate = req.body.rate;
    const sight = req.body.sight;
    const token = req.headers.authorization.split(' ')[1];
    const userId = jwt.decode(token, config.get("jwtSecret")).userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const rateCheck = await Rate.exists({
      name: sight,
      user: userId
    })
    console.log(rateCheck)
    if (rateCheck) {
      await Rate.updateOne({name:sight, user:userId}, {rate: rate});
      return res.status(200).json({message: 'Mark has been sent'})
    }
    const newRate = new Rate({
      name: sight,
      rate: rate,
      user: user.id,
    })
    await newRate.save();
    return res.status(200).json({message: 'New mark has been sent'})
  } catch (e) {

  }
})

module.exports = router