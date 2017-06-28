const express = require('express')
const app = express();
const port = 3000;
const pg = require('./db/knex')

const linkQuery = require('./db/linkQuery')
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')



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

  pg('user_data').select().where(
    'username', req.body.username
  ).first().then((user)=>{
    if(user){
      console.log('already signed up');
      res.redirect('/oops')
    } else{
      bcrypt.hash(req.body.password,10).then((hash)=>{
        var newUser = req.body;
        newUser.password = hash
        console.log(hash);
        pg('user_data').insert({
          username: newUser.username,
          password: newUser.password,
          first_name: newUser.first_name,
          last_name: newUser.last_name
        }).then(()=>{
          pg('user_data').where(
            'username', newUser.username
          ).first().then(function(useuse){
            res.redirect('/newest-user/' + useuse.username)
          })
        })
      })
    }
  })
})

app.get('/newest-user/:username', (req, res) =>{
  var user = req.params.username
  console.log(user);
  pg('user_data').select().where('username', user).first().then((data) => {
    console.log(data.username);
    res.render('profile' , {msg: data.username})
  })
})

app.get('/oops', (req,res) => {
  res.render('oops' , {message: 'That account already exist.'}) // hbs here
})

app.get('/addquiz',(req,res)=>{
  linkQuery.allquizzes().then(()=>{
    res.render('addquiz')
  })
})

app.get('/profile',(req,res)=>{
  res.render('profile')
})

// app.get('/newest-user',(req,res)=>{
//   res.render('profile',{msg:'come one come all'})
// })

app.get('/log-in',(req,res)=>{
  res.render('log-in',{msg: 'Welcome back!'})
})



app.post('/quizcollection',(req,res)=>{
  linkQuery.addquiz(req.body).then(()=>{
    console.log('did it work' , req.body);
  })
  linkQuery.allquizzes().then((data)=>{
    console.log(data);
    res.render('quizcollection',{data})
  })
})

// app.get('/quizcollection',(req,res)=>{
//   linkQuery.allquizzes().then((data)=>{
//     console.log(data);
//     res.render('quizcollection',{news: data})
//   })
// })


app.listen(port,(req,res)=>{
  console.log('listening on port ' + port);
})
