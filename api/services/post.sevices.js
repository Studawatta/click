import { db } from '../connect.js';

export const createPost = (data, callBack) => {
  const q =
    'INSERT INTO posts (`desc`,`img`,`userId`,`createdAt`) VALUES (?,?,?,?)';

  const values = [data.desc, data.img, data.userId, data.createdAt];
  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getAllPosts = (id, callBack) => {
  const q =
    'SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC';

  db.query(q, [id, id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
