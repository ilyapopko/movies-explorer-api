const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { CastomizedError, errorCodes, errorMessages } = require('../utils/errors');
const { signinValidation, signupValidation } = require('../utils/validation');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);
router.get('/signout', auth, logout);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.all('/api/*', () => {
  throw new CastomizedError(errorCodes.notFound, errorMessages.urlNotFound);
});

module.exports = router;
