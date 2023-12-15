import { db } from '../connect.js';

export const addComment = (data, callBack) => {
  const q =
    'INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?,?,?,?)';

  const values = [data.desc, data.createdAt, data.userId, data.postId];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getPostComments = (postId, callBack) => {
  const q =
    'SELECT c.*, name,profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE postId = ? ORDER BY c.createdAt DESC';

  db.query(q, [postId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
