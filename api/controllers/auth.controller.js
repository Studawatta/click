import {
  getUserByEmail,
  getUserByUsername,
  registerUser,
} from '../services/user.services.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      body.name = body.name.charAt(0).toUpperCase() + body.name.slice(1);

      registerUser(body, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).json('User created successfully!');
      });
    }
  });
};

export const login = (req, res, next) => {
  const body = req.body;

  getUserByUsername(body.username, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length === 0) {
      return next(errorHandler(404, 'User not found!'));
    } else {
      const checkPassword = bcrypt.compareSync(
        body.password,
        results[0].password
      );

      if (!checkPassword) {
        return next(errorHandler(404, 'Wrong password or username!'));
      }

      const { password: pass, ...rest } = results[0];

      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  });
};

export const logout = (req, res, next) => {
  try {
    console.log('sss');
    res.clearCookie('access_token', {
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};

export const google = (req, res, next) => {
  const body = req.body;
  getUserByEmail(body.email, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.length) {
      const { password: pass, ...rest } = results[0];
      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      //Generate password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      //hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(generatedPassword, salt);

      registerUser(
        {
          username:
            body.username.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: body.email,
          password: hashedPassword,
          name: body.username,
          profilePic: body.profilePic,
        },
        (error, results) => {
          if (error) {
            return next(error);
          }

          getUserByEmail(body.email, (error, results) => {
            if (error) {
              return next(error);
            }
            //Generate token
            const token = jwt.sign(
              { id: results[0].id },
              process.env.JWT_SECRET
            );
            const { password: pass, ...rest } = results[0];
            res
              .cookie('access_token', token, { httpOnly: true })
              .status(200)
              .json(rest);
          });
        }
      );
    }
  });
};
