const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, resp, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return resp.status(401).json({'message':'no token provided'});
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET || 'kljsadjashfroiewqrhnfdkadsnfasjdliajdiasjdoiasjdsakjndasjdoajdoiajdoisd');
        req.user = decoded;
        next();
    }catch (e) {
        return  resp.status(401).json({'message':'token invalid'});
    }
}
module.exports = AuthMiddleware;