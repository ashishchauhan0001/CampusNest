import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import { errorHandler } from './error.js';

dotenv.config(); // Initialize environment variables

const app = express();
app.use(cookieParser()); // Ensure cookie-parser is used

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized: No token provided'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden: Invalid or expired token'));

    req.user = user;
    next();
  });
};

