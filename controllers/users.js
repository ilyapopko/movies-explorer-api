const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CastomizedError, errorCodes, errorMessages } = require('../utils/errors');

const dataUser = (user) => ({
  email: user.email,
  name: user.name,
  _id: user._id,
});

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
        expiresIn: '7d',
      });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({
        token,
        user: dataUser(user),
      });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
    })
      .send({
        message: 'Вы вышли из профиля',
      });
  } catch (err) {
    next(err);
  }
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      password: hash, email, name,
    }))
    .then((user) => res.send(dataUser(user)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new CastomizedError(errorCodes.conflict, errorMessages.conflictEmail));
      } else if (err.name === 'ValidationError') {
        next(new CastomizedError(errorCodes.badRequest, err.message));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new CastomizedError(errorCodes.notFound, errorMessages.notFoundUser);
    })
    .then((user) => res.send(dataUser(user)))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    email, name,
  }, {
    new: true, runValidators: true,
  })
    .orFail(() => {
      throw new CastomizedError(errorCodes.notFound, errorMessages.notFoundUser);
    })
    .then((user) => res.send(dataUser(user)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new CastomizedError(errorCodes.conflict, errorMessages.conflictEmail));
      } else if (err.name === 'ValidationError') {
        next(new CastomizedError(errorCodes.badRequest, err.message));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({
  })
    .then((users) => res.send(users.map((user) => dataUser(user))))
    .catch(next);
};

module.exports = {
  dataUser,
  login,
  logout,
  createUser,
  getCurrentUser,
  updateProfile,
  getUsers,
};
