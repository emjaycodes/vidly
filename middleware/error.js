const logger = require('./logger');

const winston = require('winston');
module.exports = function(err, req, res, next){
    logger.error(err.message, { stack: err.stack });
    res.status(500).send('it\'s not you it\'s us, something failed')
   }
   