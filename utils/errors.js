class CastomizedError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'CastomizedError';
    this.statusCode = status;
  }
}

// 400 — переданы некорректные данные в метод создания карточки,
//       пользователя, обновления аватара пользователя и профиля;
// 401 — передан неверный логин или пароль.
//       Ещё эту ошибку возвращает авторизационный middleware, если передан неверный JWT;
// 403 — попытка удалить чужую карточку;
// 404 — карточка или пользователь не найден, или был запрошен несуществующий роут;
// 409 — при регистрации указан email, который уже существует на сервере;
// 500 — ошибка по умолчанию. Сопровождается сообщением «На сервере произошла ошибка».

const errorCodes = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  default: 500,
};

const errorMessages = {
  default: 'Произошла непредвиденная ошибка на сервере.', // 500
  notFoundUser: 'Пользователь по указанному _id не найден.', // 404
  notFoundMovie: 'Фильм с указанным _id не найден.', // 404
  urlNotFound: 'Запрашиваемый ресурс не найден.', // 404
  forbidden: 'Попытка удалить чужой фильм.', // 403
  badToken: 'Истек срок действия авторизации, необходимо заново пройти авторизацию.', // 401
  badLogin: 'Переданы некорректные почта или пароль.', // 401
  conflictEmail: 'Пользователь с таким email уже существует.', // 409
  badUrl: 'не соответствует правилам составления url', // 400
};

const centralErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = 'Произошла непредвиденная ошибка на сервере.' } = err;

  res.status(statusCode).send({
    message,
  });

  next();
};

module.exports = {
  CastomizedError,
  errorCodes,
  errorMessages,
  centralErrorHandler,
};
