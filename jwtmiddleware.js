const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try{
        let token = req.header('x-token');
        if(!token){
            res.status(400)
            res.send('Token Not found');
        }
        let verifyjwt = jwt.verify(token,'secret_key');
        req.user = verifyjwt.user
        next();
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('Invalid token')
    }
}
