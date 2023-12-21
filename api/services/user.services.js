import { error } from 'console';
import { db } from '../connect.js';

export const registerUser = (data, callBack) => {
  const q =
    'INSERT INTO users (`username`,`email`,`password`,`name`,`profilePic`) VALUES (?,?,?,?,?)';
  const values = [
    data.username,
    data.email,
    data.password,
    data.name,
    data.profilePic,
  ];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getUserByUsername = (username, callBack) => {
  const q = `SELECT * FROM users WHERE username = ?`;
  db.query(q, [username], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getUserByEmail = (email, callBack) => {
  const q = `SELECT * FROM users WHERE email = ?`;

  db.query(q, [email], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const getUserById = (id, callBack) => {
  const q = `SELECT * FROM users WHERE id = ?`;

  db.query(q, [id], (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};

export const userUpdate = (data, callBack) => {
  const q =
    'UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=?';

  const values = [
    data.name,
    data.city,
    data.website,
    data.profilePic,
    data.coverPic,
    data.id,
  ];

  db.query(q, values, (error, results) => {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
};
