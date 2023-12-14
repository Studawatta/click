import { db } from '../connect.js';

export const getAllPosts = (id, callback) => {
  const q =
    'SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC';

  db.query(q, [id, id], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};
