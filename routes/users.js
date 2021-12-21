const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

const { getCurrentUser, updateProfile, getUsers } = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      name: Joi.string().trim().required().min(2)
        .max(30),
    },
  ),
}), updateProfile);

router.get('/', getUsers);

module.exports = router;
