import { getUserById } from '../services/user.services.js';

export const getUser = (req, res, next) => {
  getUserById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results);
  });
};
