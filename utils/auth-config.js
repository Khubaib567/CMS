// authorization middleware for protecting routes
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.auth = () =>  {
    return (req, res, next) => {
        let token;

        header = req.headers.cookie;
        token = header && header.replace('jwt=','')
        // Authorized the users
        console.log('Access the Private Route!')

        if (token == null) return res.status(401).send({ message: "Access denied!" });

        // Authenticated the user
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(403).send({ message: "Not authorized, token failed!" });
            req.user = user
            next()
        })

    }
}



