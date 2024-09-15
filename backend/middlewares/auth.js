const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed", err);
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.user = { id: decoded.id }; // Store decoded id in req.user
    console.log("Token verified, user ID:", req.user.id);
    next();
  });
};

module.exports = verifyToken;
