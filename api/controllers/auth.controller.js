import { getUserByUsername, registerUser } from '../services/user.services.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';

export const register = (req, res, next) => {
  const body = req.body;
  //CHECK USER IF EXISTS
  getUserByUsername(body.username, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length) {
      return next(errorHandler(409, 'User already exists'));
    } else {
      //CREATE A NEW USER
      // hash the pssword
      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);

      registerUser(body, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).json('User created successfully!');
      });
    }
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
