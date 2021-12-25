const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('../utils/validation');
const { CastomizedError, errorCodes, errorMessages } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" обязательно для заполнения.'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Поле "email" не соответствует правилам составления email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" обязательно для заполнения'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Поле "name" должно быть не менее 2 символов.'],
    maxlength: [30, 'Поле "name" должно быть не более 30 символов.'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({
    email,
  }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new CastomizedError(errorCodes.unauthorized, errorMessages.badLogin));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new CastomizedError(
              errorCodes.unauthorized,
              errorMessages.badLogin,
            ));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
