const express = require('express')
const app = express();
const port = 3000;
const pg = require('./db/knex')

const linkQuery = require('./db/linkQuery')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static('public'));
app.set('view engine','hbs')

app.use(express.static('views'))

app.get('/',(req,res)=>{
  res.render('index',{title:'please, sign up'})
})

app.get('/sign-up',(req,res)=>{
  res.render('sign-up',{msg: 'Free and easy sign up!'})
})

app.post('/newest-user',(req,res)=>{
  linkQuery.adduserdata(req.body).then(()=>{
    res.render('profile',{msg: req.body.first_name})
  })
})

app.get('/gotoquizzes',(req,res)=>{
  linkQuery.allquizzes().then(()=>{
    res.render('addquiz')
  })
})

app.get('/profile',(req,res)=>{
  res.render('profile')
})

app.get('/newest-user',(req,res)=>{
  res.render('profile',{msg:'come one come all'})
})

app.get('/log-in',(req,res)=>{
  res.render('log-in',{msg: 'Welcome back!'})
})

app.listen(port,(req,res)=>{
  console.log('listening on port ' + port);
})
