const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');
// const { regex } = require('../utils/validation');

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image,
//   trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/movieId

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

// Вопросы:
// duration - целое или нет число? если дробное то какие параметры
// nameRU - нужно проверять на русские буквы
// nameEN - нужно проверять на английские буквы
router.post('/', celebrate({
  body: Joi.object().keys(
    {
      country: Joi.string().trim().required(),
      director: Joi.string().trim().required(),
      duration: Joi.number().trim().required(),
      year: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      // movieId: Joi.string().alphanum().length(24).hex(),
      movieId: Joi.string().trim().required(),
      // image: Joi.string().trim().required().pattern(regex),
      // trailer: Joi.string().trim().required().pattern(regex),
      // thumbnail: Joi.string().trim().required().pattern(regex),
      image: Joi.string().trim().required(),
      trailer: Joi.string().trim().required(),
      thumbnail: Joi.string().trim().required(),
      nameRU: Joi.string().trim().required(),
      nameEN: Joi.string().trim().required(),
    },
  ),
}), addMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys(
    {
      movieId: Joi.string().alphanum().length(24).hex(),
    },
  ),
}), deleteMovie);

module.exports = router;