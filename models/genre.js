const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
});

const Genre = mongoose.model('Genre', genreSchema);
  
  function validateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
  
    return schema.validate(genre);
  }
  

  exports.Genre = Genre;
  exports.genreSchema = genreSchema;
  exports.validateGenre = validateGenre;