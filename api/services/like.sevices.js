import { db } from '../connect.js';

export const getLikesByPostId = (postId, callBack) => {
  const q = 'SELECT userId from likes WHERE postId = ?';

  db.query(q, [postId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const addPostLike = (data, callBack) => {
  const q = 'INSERT INTO likes (`userId`,`postId`) VALUES (?,?)';

  const values = [data.userId, data.postId];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const deletePostLike = (data, callBack) => {
  const q = 'DELETE FROM likes WHERE `userId` = ? AND `postId` = ?';
  const values = [data.userId, data.postId];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
