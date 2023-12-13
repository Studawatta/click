import { getAllPostsByUser } from '../services/post.sevices.js';
import jwt from 'jsonwebtoken';

export const getPosts = (req, res, next) => {
  const token = req.cookies.access_token;

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    getAllPostsByUser(userInfo.id, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json(results);
    });
  });
};
