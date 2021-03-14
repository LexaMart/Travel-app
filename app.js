const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json({
  extended: true,
}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/countryList', require('./routes/countries.routes'))
app.get('/photo', async (req, res) => {
  console.log(req.query.path)
  let path = req.query.path;
  if (!path) return res.status(404).json({ message: 'Bad user PATH' });
  console.log(process.cwd() + "\\" + path)
  return res.sendFile(process.cwd() + '\\' + path);
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
