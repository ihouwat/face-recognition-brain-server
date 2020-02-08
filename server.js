const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Wisaal83',
    database : 'smartbrain'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});


const app = express();

// Body parser
app.use(bodyParser.json());
// CORS
app.use(cors());

app.get('/', (req, res) => {res.send(db.users)})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister (req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})


app.listen(3000, () => {
  console.log('app is running on port 3000');
});



/* ROUTES to build

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user (updated with ranking)
*/