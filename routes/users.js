const router = require('express').Router();
const { patchUserValidation } = require('../utils/validation');
const { getCurrentUser, updateProfile, getUsers } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', patchUserValidation, updateProfile);
router.get('/', getUsers);

module.exports = router;
