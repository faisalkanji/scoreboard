const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://faisalkanji:test1qaz@ds147711.mlab.com:47711/leaderboard', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('starting on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  db.collection('score').find().sort({score: -1}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {scores: result})
  })
})

app.post('/addscore', (req, res) => {
  req.body.score = parseInt(req.body.score)
  console.log(req.body)
  db.collection('score').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('new entry')
    res.redirect('/')
  })
})
