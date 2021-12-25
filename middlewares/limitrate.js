const rateLimiting = require('express-rate-limit');

const customLimitRate = rateLimiting({
  windowMs: 7.5 * 30 * 500,
  max: 100,
  message: 'Слишком много запросов, попробуйте позже',
  headers: true,
});

module.exports = {
  customLimitRate,
};
