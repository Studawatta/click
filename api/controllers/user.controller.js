import { getUserById, userUpdate } from '../services/user.services.js';

export const getUser = (req, res, next) => {
  getUserById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(results);
  });
};

export const updateUser = (req, res, next) => {
  console.log('ddd');

  const data = {
    name: req.body.name
      ? req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1)
      : '',
    city: req.body.city,
    website: req.body.website,
    profilePic: req.body.profilePic,
    coverPic: req.body.coverPic,
    id: req.user.id,
  };
  userUpdate(data, (error, results) => {
    if (error) {
      return next(error);
    }
    getUserById(req.user.id, (error, results) => {
      if (error) {
        return next(error);
      }
      const { password: pass, ...rest } = results[0];
      return res.status(200).json(rest);
    });
  });
};
