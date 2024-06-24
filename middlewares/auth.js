import jwtAuth from '../utils/jwt.js'

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    const decoded = jwtAuth.verifyAuthToken(token);
    if (!decoded) return res.status(401).send('Access denied. Invalid Token');

    req.user = decoded;
    next();
}

export default auth;