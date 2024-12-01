const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("../models/genre");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true,  minLength: 5, maxLength: 50 },
  genre: { type: genreSchema, required: true }, // Embed genreSchema
  numberInStock: { type: Number, required: true , min: 0, max: 255},
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.object({
      // Validate embedded genre
      name: Joi.string().min(5).max(50).required(),
    }).required(),
    name: Joi.string().min(5).max(50).required(),
    numberInStock: Joi.number(0).required(),
    dailyRentalRate: Joi.number(0).required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
