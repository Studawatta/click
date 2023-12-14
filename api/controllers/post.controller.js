import moment from 'moment';
import { createPost, getAllPosts } from '../services/post.sevices.js';

export const getPosts = (req, res, next) => {
  getAllPosts(req.user.id, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results);
  });
};

export const addPosts = (req, res, next) => {
  const data = {
    desc: req.body.desc,
    img: req.body.img,
    userId: req.user.id,
    createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  };

  createPost(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Post has been created!');
  });
};
