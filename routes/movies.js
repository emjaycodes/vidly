const auth =  require('../middleware/auth');
const {Movie, validateMovie } = require('../models/movie')
// const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()

// app.use(express.json());



  
  router.get('/', async(req, res) => {
  const movies = await Movie.find().sort('name'); 
     res.send(movies);
  });
  
  router.post('/', auth, async (req, res) => {
    const { error } = validateMovie (req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid genre');

    let movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre.id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save(movie); 
    res.send(movie);
  });
  
  router.put('/:id', async (req, res) => {
  
      const { error } = validateMovie (req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await movie.findByIdAndUpdate(req.params.id, {name: req.body.name, new: true
    })

    
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });
  
  router.delete('/:id', async (req, res) => {

  const movie = await movie.findByIdAndRemove(req.params.id, {name: req.body.name, new: true
    })

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });
  
  router.get('/:id', async (req, res) => {
  const movie = await movie.findById(req.params.id, {name: req.body.name, new: true
    })
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
  });  
  
  module.exports = router;