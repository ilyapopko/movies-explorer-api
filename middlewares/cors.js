const cors = require('cors');

const appCors = cors({
  origin: [
    /^https?:\/\/movies-explorer-popko.nomoredomains.rocks/,
    'http://localhost:3000',
    'http://localhost',
  ],
  credentials: true,
});

module.exports = {
  appCors,
};
