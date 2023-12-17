import { json } from 'express';
import {
  getLikesByPostId,
  addPostLike,
  deletePostLike,
} from '../services/like.sevices.js';

export const getLikes = (req, res, next) => {
  getLikesByPostId(req.query.postId, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results.map((like) => like.userId));
  });
};

export const addLike = (req, res, next) => {
  const data = {
    userId: req.user.id,
    postId: req.body.postId,
  };
  addPostLike(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Liked!');
  });
};

export const deleteLike = (req, res, next) => {
  const data = {
    userId: req.user.id,
    postId: req.query.postId,
  };
  deletePostLike(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Disliked!');
  });
};
