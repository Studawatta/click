import { db } from '../connect.js';

export const getAllPostsByUser = (id, callback) => {
  const q = 'SELECT * FROM posts WHERE userId = ?';

  db.query(q, [id], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};
