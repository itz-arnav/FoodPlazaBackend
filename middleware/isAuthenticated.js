import jwt from 'jsonwebtoken';

const JWT_TOKEN = process.env.JWT_TOKEN
export const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate' });
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
