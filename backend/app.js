const express = require('express')
const app = express()
const port = 9000
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require("cors");

app.use(cors())
app.use('/gro', routes)
app.use(express.json());

url = 'mongodb://127.0.0.1:27017/plantDB'
mongoose.connect(url)
const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

app.listen(port, () => {
  console.log(`Gro app listening on port ${port}`)
})