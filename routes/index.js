const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/api/signin', celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    },
  ),
}), login);

router.post('/api/signup', celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
      name: Joi.string().trim().min(2).max(30),
    },
  ),
}), createUser);

router.get('/api/signout', logout);

router.use('/api/users', auth, usersRouter);
router.use('/api/movies', auth, moviesRouter);

module.exports = router;
