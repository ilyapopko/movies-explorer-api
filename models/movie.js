const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

// country — страна создания фильма. Обязательное поле-строка.
// director — режиссёр фильма. Обязательное поле-строка.
// duration — длительность фильма. Обязательное поле-число.
// year — год выпуска фильма. Обязательное поле-строка.
// description — описание фильма. Обязательное поле-строка.
// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailer — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
// thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка.
// Запишите её URL-адресом.
// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
// nameRU — название фильма на русском языке. Обязательное поле-строка.
// nameEN — название фильма на английском языке. Обязательное поле-строка.

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" обязательно для заполнения.'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" обязательно для заполнения.'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" обязательно для заполнения.'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" обязательно для заполнения.'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" обязательно для заполнения.'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" обязательно для заполнения.'],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: 'Поле "image" не соответствует правилам составления url',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" обязательно для заполнения.'],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: 'Поле "trailer" не соответствует правилам составления url',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" обязательно для заполнения.'],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: 'Поле "thumbnail" не соответствует правилам составления url',
    },

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" обязательно для заполнения.'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" обязательно для заполнения.'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" обязательно для заполнения.'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
