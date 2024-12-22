require('express-async-errors');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();


const genres = require('./routes/genres') ;
const movies = require('./routes/movies') ;
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');


  
if (!config.get('jwtPrivateKey')) {
    console.error(' FATAL ERROR: jwtPrivateKey is denied.');
    process.exit(1);
}


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly-db').then(()=> console.log('Connected to mongoDB........')).catch(err=> console.error('could not connect to MongoDB.......'))


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
