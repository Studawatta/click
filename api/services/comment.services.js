import { db } from '../connect.js';

export const getPostComments = (postId, callBack) => {
  const q =
    'SELECT c.*, name,profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE postId = ?';

  db.query(q, [postId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
