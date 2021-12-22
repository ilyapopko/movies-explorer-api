# movies-explorer-api

backend movies-explorer

## URL (на Yandex.cloud)
* https://movies-explorer-popko.nomoredomains.rocks/api

## Доступные команды
- `npm run start` — запускает сервер
- `npm run dev` — запускает сервер в dev-режиме
- `npm run lint` — запуск линтера

## Доступные роуты
- /signup (POST) - регистрирует нового пользователя
- /signin (POST) - авторизует текущего пользователя
- /signout (GET) - выход из профиля текущего пользователя
- /users (GET) - возвращает список всех пользователей
- /users/me (GET) - возвращает текущего пользователя
- /users/me (PATCH) - обновляет данные текущего пользователя
- /movies (GET) - возвращает список фильмов текущего пользователя
- /movies (POST) - добавляет фильм в список пользователя
- /movies/movieId (DELETE) - удаляет фильм с идентификатором movieId
                              из списка текущего пользователя
