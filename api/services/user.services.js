import { db } from '../connect.js';

export const registerUser = (data, callBack) => {
  const q = `INSERT INTO users (username,email,password,name) VALUES (?,?,?,?)`;
  const values = [data.username, data.email, data.password, data.name];

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
