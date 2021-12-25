const { ObjectId } = require('mongodb');
const Movie = require('../models/movie');
const { CastomizedError, errorCodes, errorMessages } = require('../utils/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies.map((movie) => movie)))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie._id))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastomizedError(errorCodes.badRequest, err.message));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new CastomizedError(errorCodes.notFound, errorMessages.notFoundMovie);
    })
    .then((movie) => {
      if (!movie.owner._id.equals(new ObjectId(req.user._id))) {
        throw new CastomizedError(errorCodes.forbidden, errorMessages.forbidden);
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({
          message: 'Фильм удален из списка',
        }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
