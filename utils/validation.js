const isEmail = require('validator/lib/isEmail');

const regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/;

const isUrl = (str) => regex.test(str);
const isRuStr = (str) => regex.test(str);
const isEnStr = (str) => regex.test(str);

module.exports = {
  isEmail,
  isUrl,
  isRuStr,
  isEnStr,
  regex,
};
