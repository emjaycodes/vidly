const jwt = require('jsonwebtoken');
const config = require('config')
 
module.exports = function (req, res, next ){
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied. no token provided.')

    try{
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    }
    catch(ex){
        res.status(400).send('invalid');
    }
} 

