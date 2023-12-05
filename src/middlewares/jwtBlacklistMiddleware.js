// jwtMiddleware.js
import jwt from 'jsonwebtoken';
import { isInBlacklist } from '../utils/jwtBlacklist.js'

function checkJwtBlacklist(req, res, next) {
    const token = req.headers["authorization"].split(' ')[1];

  // Check if the token is in the blacklist
  if (isInBlacklist(token)) {
    return res.status(401).json({ error: 'Token revoked' });
  }

  // Verify the JWT
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach decoded user information to the request object
    req.user = decoded;
    next();
  });
}

export {checkJwtBlacklist}
   