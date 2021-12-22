const router = require('express').Router();
const { postMovieValidation, delMovieValidation } = require('../utils/validation');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', postMovieValidation, addMovie);
router.delete('/:movieId', delMovieValidation, deleteMovie);

module.exports = router;
