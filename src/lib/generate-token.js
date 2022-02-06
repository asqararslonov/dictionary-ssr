const jwt = require("jsonwebtoken");

module.exports.mySign = function (payload) {
  return jwt.sign(payload, "mysupermupersecret");
};

module.exports.myVerify = function (token) {
  try {
    return jwt.verify(token, "mysupermupersecret");
  } catch (e) {
    return {};
  }
};
