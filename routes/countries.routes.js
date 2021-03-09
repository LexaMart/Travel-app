const { Router } = require('express');
const Country = require('../bd/country.schema');
const router = Router();

router.get('/', async (req,res) => {
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
        cardBG: el.cardBG,
        id: el.id,
      }
    })
    res.status(200).json({response});
  }catch (e) {
    console.log(e)
  }
})

module.exports = router