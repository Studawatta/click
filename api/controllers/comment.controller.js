import { getPostComments } from '../services/comment.services.js';

export const getComments = (req, res, next) => {
  getPostComments(req.query.postId, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results);
  });
};
