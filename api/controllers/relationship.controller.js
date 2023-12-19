import {
  addUserRelationship,
  deleteUserRelationship,
  getUserRelationship,
} from '../services/relationship.services.js';

export const getRelationship = (req, res, next) => {
  getUserRelationship(req.query.userId, (error, results) => {
    if (error) {
      return next(error);
    }
    return res
      .status(200)
      .json(results.map((relation) => relation.followerUserId));
  });
};
export const addRelationship = (req, res, next) => {
  const data = {
    followedUserId: req.user.id,
    followerUserId: req.body.userId,
  };
  addUserRelationship(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Followed!');
  });
};
export const deleteRelationship = (req, res, next) => {
  const data = {
    followedUserId: req.user.id,
    followerUserId: req.query.userId,
  };

  deleteUserRelationship(data, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json('Unfollowd!');
  });
};
