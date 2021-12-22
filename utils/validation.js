const isEmail = require('validator/lib/isEmail');
const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/;

const isUrl = (str) => regex.test(str);

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
      image: Joi.string().trim().required().pattern(regex),
      trailer: Joi.string().trim().required().pattern(regex),
      thumbnail: Joi.string().trim().required().pattern(regex),
      nameRU: Joi.string().trim().required(),
      nameEN: Joi.string().trim().required(),
    },
  ),
});

const delMovieValidation = celebrate({
  params: Joi.object().keys(
    {
      movieId: Joi.number().required(),
    },
  ),
});

module.exports = {
  isEmail,
  isUrl,
  signinValidation,
  signupValidation,
  patchUserValidation,
  postMovieValidation,
  delMovieValidation,
};
