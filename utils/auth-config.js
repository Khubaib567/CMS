// MIDDLEWARES FOR PROTECTING ROUTES
const jwt = require('jsonwebtoken');
const db = require("../config/db.config");
const User = db.users;
require('dotenv').config()

const auth = () =>  {
    return (req, res, next) => {
        let token;

        header = req.headers.cookie;
        token = header && header.replace('jwt=','')
        // AUTHENTICATED THE USERS
        console.log('Access the Private Route!')

        if (token == null) return res.status(401).send({ message: "Access denied!" });
        // AUTHENTICATED THE USERS
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(403).send({ message: "Not authorized, token failed!" });
            req.user = user
            next()
        })

    }
}

const authRole =  () => {
    return async (req, res, next) => {
    let token;
    // AUTHORIZED THE USERS BASED ON ROLE
    console.log('Access the Private Route!')
    // DECODED THE JWT TOKEN
    token = req.headers.cookie;
    token = token.replace('jwt=','')
    // console.log(token)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);  
    const userId = decoded.id  
    const user = await User.findByPk(userId, { include: ["projects"] });
    // console.log(user.role)
    if (user.role !== process.env.ADMIN) {
        res.status(401)
        return res.send({ message : 'Not allowed!' })
    }
    next()
    }
}


module.exports = {
    auth,
    authRole
}


