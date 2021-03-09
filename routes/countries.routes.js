const config = require('config');
const { Router } = require('express');
const request = require('request-promise');
const Country = require('../bd/country.schema');
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
    console.log(id);
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
    let curenciesCurses = null;
    await request(`https://currate.ru/api/?get=rates&pairs=${country.currencies}USD,${country.currencies}EUR,${country.currencies}RUB&key=${config.get('currencies')}`,(err, res, body) => {
      curenciesCurses = body
      console.log(body);
    })
    res.status(200).json({
      name: country.name,
      capital: country.capital,
      lat: country.lat,
      lng: country.lng,
      language: country.language,
      currency: country.currencies,
      timezone: country.timezone,
      sights: country.sights,
      video: country.video,
      description: country.description,
      timezone: country.timezone,
      weather: weather,
      curenciesCurses: curenciesCurses,
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router