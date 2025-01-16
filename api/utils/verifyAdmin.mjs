import jwt from 'jsonwebtoken'
import { errorHandler } from './error.mjs';

export const isAdmin = (req, res, next) => {
    const token = req.cookies.admin_token;
    if (!token) {
      return res.status(401).json('Not authenticated');
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== 'admin') {
        return res.status(403).json('Forbidden');
      }
      req.admin = decoded; // You can attach the admin data to `req.admin`
      next();
    });
  };
  