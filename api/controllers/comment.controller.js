import { addComment, getPostComments } from '../services/comment.services.js';
import moment from 'moment';

export const writeComment = (req, res, next) => {
  const data = {
    desc: req.body.desc,
    createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    userId: req.user.id,
    postId: req.body.postId,
  };

  addComment(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('commented!');
  });
};

export const getComments = (req, res, next) => {
  getPostComments(req.query.postId, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results);
  });
};
