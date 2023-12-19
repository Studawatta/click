import { db } from '../connect.js';

export const getUserRelationship = (userId, callBack) => {
  const q = 'SELECT followerUserId FROM relationships WHERE followedUserId = ?';

  db.query(q, [userId], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const addUserRelationship = (data, callBack) => {
  const q =
    'INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?,?)';

  const values = [data.followerUserId, data.followedUserId];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const deleteUserRelationship = (data, callBack) => {
  const q =
    'DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?';
  const values = [data.followerUserId, data.followedUserId];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
