const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers.authorization;
    if(!auth){
        return res.status(403).json({
            message:'unauthorization,Jwt is not provided'
        })
    }
    const token = auth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(req.user);
        req.user = decoded;
        // console.log(req.user)
        next();
    } catch (error) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }}
module.exports = ensureAuthenticated;