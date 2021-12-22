const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { CastomizedError, errorCodes, errorMessages } = require('../utils/errors');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signin', celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    },
  ),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
      name: Joi.string().trim().min(2).max(30),
    },
  ),
}), createUser);

router.get('/signout', auth, logout);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.all('/*', () => {
  throw new CastomizedError(errorCodes.notFound, errorMessages.urlNotFound);
});

module.exports = router;
