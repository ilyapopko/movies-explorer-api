const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { CastomizedError, errorCodes, errorMessages } = require('../utils/errors');
const { signinValidation, signupValidation } = require('../utils/validation');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/api/signin', signinValidation, login);
router.post('/api/signup', signupValidation, createUser);
router.get('/api/signout', auth, logout);
router.use('/api/users', auth, usersRouter);
router.use('/api/movies', auth, moviesRouter);

router.all('/*', auth, () => {
  throw new CastomizedError(errorCodes.notFound, errorMessages.urlNotFound);
});

module.exports = router;
