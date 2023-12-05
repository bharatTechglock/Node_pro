import jwt from "jsonwebtoken";
// Token blacklist (in-memory for simplicity, consider using a database)
const tokenBlacklist = [];

// Middleware to check token blacklist
const checkTokenBlacklist = (req, res, next) => {
    const token = req.headers["authorization"].split(' ')[1];
    // console.log(token); return false;

  if (token) {
    // console.log(tokenBlacklist.includes(token)); return false;

    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ message: 'Token revoked' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token not provided' });
  }
};

// Logout route handler
const logoutHandler = (req, res) => {
    const token = req.headers["authorization"].split(' ')[1];
    // console.log(token); return false
  if (token) {
    tokenBlacklist.push(token);
    // res.status(401).json({ message: 'Token invalidated' });
  } else {
    return res.status(401).json({
        error: error,
        message: error.message
    });
  }
};


export { checkTokenBlacklist, logoutHandler };
