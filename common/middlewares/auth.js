import jwt from 'jsonwebtoken';

function validateToken(token, secret) {
  try {
    const tokenParts = token.split(' ');
    const decoded = jwt.verify(tokenParts[1], secret);
    return decoded;
  } catch (error) {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decodedToken = validateToken(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decodedToken;

  next();
}

export { authMiddleware };
