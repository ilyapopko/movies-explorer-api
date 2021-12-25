const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const { errorMessages } = require('./errors');

const validUrl = (url) => {
  if (!isURL(url)) throw new CelebrateError(`${url} ${errorMessages.badUrl}`);
  return url;
};

const signinValidation = celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    },
  ),
});

const signupValidation = celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
      name: Joi.string().trim().min(2).max(30),
    },
  ),
});

const patchUserValidation = celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      name: Joi.string().trim().required().min(2)
        .max(30),
    },
  ),
});

const postMovieValidation = celebrate({
  body: Joi.object().keys(
    {
      country: Joi.string().trim().required(),
      director: Joi.string().trim().required(),
      duration: Joi.number().required(),
      year: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      movieId: Joi.number().required(),
      image: Joi.string().trim().required().custom(validUrl),
      trailer: Joi.string().trim().required().custom(validUrl),
      thumbnail: Joi.string().trim().required().custom(validUrl),
      nameRU: Joi.string().trim().required(),
      nameEN: Joi.string().trim().required(),
    },
  ),
});

const delMovieValidation = celebrate({
  params: Joi.object().keys(
    {
      movieId: Joi.string().alphanum().length(24).hex(),
    },
  ),
});

module.exports = {
  isEmail,
  // isUrl,
  signinValidation,
  signupValidation,
  patchUserValidation,
  postMovieValidation,
  delMovieValidation,
};
