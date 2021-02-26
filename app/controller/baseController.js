'use strict';

const { Controller } = require('egg');

// 422 参数错误

class BaseController extends Controller {

  success({ code = 0, data = {}, msg = 'success', loggerMsg = null }) {
    this.ctx.body = {
      code,
      data,
      msg,
    };
    this.ctx.status = 200;
    if (loggerMsg) this.app.logger.info(loggerMsg);
  }

  fail({ code = -1, data = {}, msg = 'fail', loggerMsg = null }) {
    this.ctx.body = {
      code,
      data,
      msg,
    };
    this.ctx.status = 200;
    if (loggerMsg) this.app.logger.error(loggerMsg);

  }

}

module.exports = BaseController;
