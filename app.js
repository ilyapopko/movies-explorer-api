require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { appCors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrorHandler } = require('./utils/errors');
const { customLimitRate } = require('./middlewares/limitrate');

const routes = require('./routes');

const { PORT = 3000, NODE_ENV, DB_BASE_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_BASE_URL : 'mongodb://127.0.0.1:27017/moviesdb');

const app = express();

app.use('*', appCors);

app.use(requestLogger);

app.use(customLimitRate);

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use('/api/', routes);

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT);
