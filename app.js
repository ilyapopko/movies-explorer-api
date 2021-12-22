require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

const { PORT = 3000, NODE_ENV, DB_BASE_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_BASE_URL : 'mongodb://127.0.0.1:27017/moviesdb');

const app = express();

app.use('*', cors({
  origin: [
    /^https?:\/\/movies-explorer-popko.nomoredomains.rocks/,
    'http://localhost:3000',
    'http://localhost',
  ],
  credentials: true,
}));

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.use('/api/', routes);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Произошла непредвиденная ошибка на сервере.' } = err;
  return res.status(statusCode).send({
    message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been listening on port ${PORT}`);
});
