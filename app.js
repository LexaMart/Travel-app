const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8080;
const Country = require('./bd/country.schema');

app.use(express.json({
  extended: true,
}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/countryList', require('./routes/countries.routes'))
app.get('/photo', async (req, res) => {
  let path = req.query.path;
  if (!path) return res.status(404).json({ message: 'Bad user PATH' });
  return res.sendFile(process.cwd() + '\\' + path);
 })

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://LexaMart:1q2w3e@cluster0.kaxpd.mongodb.net/travelapp?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => {
      console.log(`Server is started on PORT ${PORT}`);
    });
    
  } catch (e) {
  }
}

start();
