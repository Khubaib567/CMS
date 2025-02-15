const jwt = require('jsonwebtoken')
require('dotenv').config()

// controller for generate token when register request
const generateToken = async (res,userid)=>{
  let token;
  // console.log(userid)
  token = jwt.sign( {id: userid}, process.env.ACCESS_TOKEN, { expiresIn: 60 * 60});
  await res.cookie('jwt',token, {
    httpOnly:true,
    secure: process.env.NODE !== 'development', // hide cookies in production 
    sameSite:'strict', // prevent attacker to hacks user's activity when user come from different origin.
    maxAge: 30*24*60*60*1000 // expires in 30 days.
  })

  // console.log(token)
  token = token.replace('jwt=','')
  return token

  
}

// controller for remove token when logout request
const removeToken =  async (req,res)=> {
  const header = req.headers.cookie;
  const token = header && header.replace(header,'')
  await res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(0),
  });

}
  

 
    

module.exports = {generateToken,removeToken}