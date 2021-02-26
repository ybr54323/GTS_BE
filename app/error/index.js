'use strict';
// 400
class NoLogin extends Error {
  constructor(...args) {
    super(args);
  }
}
// 402
class ValidateParamsError extends Error {
  constructor(...args) {
    super(args);
  }
}

module.exports = {
  ValidateParamsError,
  NoLogin,
};
