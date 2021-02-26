'use strict';
const { NoLogin } = require('../error/index');
module.exports = options => {
  return async function gzip(ctx, next) {
    if (!ctx.session.user) throw new NoLogin();
    await next();
  };
};
