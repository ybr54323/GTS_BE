'use strict';
const BaseController = require('./baseController');
const ZhenzismsClient = require('./../../utils/zhenzisms');
const { generateCode } = require('../../utils/index');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends BaseController {
  async smsCode() {
    const { app, ctx } = this;
    const { mobile } = ctx.permitAndValidateParams({
      mobile: {
        type: 'string',
        required: true,
        format: /^[1]([3-9])[0-9]{9}$/,
      },
    });
    const client = new ZhenzismsClient('sms_developer.zhenzikj.com', this.app.config.zhenZiYun.appId, this.app.config.zhenZiYun.appSecret);
    const smsCode = generateCode(6);
    const { code: zhenZiCode, data } = await client.send({
      templateId: '895',
      number: mobile,
      templateParams: [ smsCode, '5分钟' ],
    });
    if (zhenZiCode === 0) {
      await app.redis.set(mobile, smsCode);
      return this.success({ msg: '发送成功' });
    }
    return this.success({
      code: zhenZiCode,
      msg: ZhenzismsClient.codeMean[+zhenZiCode],
      data,
    });
  }

  async smsCodeLogin() {
    const { app, ctx } = this;
    const { mobile, smsCode } = ctx.permitAndValidateParams({
      smsCode: {
        type: 'string',
        required: true,
      },
      mobile: {
        type: 'string',
        required: true,
        format: /^[1]([3-9])[0-9]{9}$/,
      },
    });
    const sentCode = await app.redis.get(mobile);
    if (sentCode !== smsCode) return this.fail({ msg: '手机号或验证码错误' });
    const [ user, created ] = await ctx.model.User.findOrCreate({
      where: { mobile, isDelete: 0 },
      defaults: {
        name: '新用户',
      },
    });
    ctx.session.user = user;
    this.success({ msg: created ? '欢迎新用户' : '欢迎回来', data: {
      user,
    } });
  }

  async login() {
    const { ctx } = this;
    const { mobile, password } = ctx.permitAndValidateParams({
      mobile: {
        type: 'string',
        required: true,
        format: /^[1]([3-9])[0-9]{9}$/,
      },
      password: {
        type: 'string',
        required: true,
      },
    });
    const user = await ctx.model.User.findOne({
      where: {
        mobile,
        password,
      },
    });
    ctx.session.user = user;
    if (user === null) return this.fail({ msg: '手机号码或者密码错误' });
    this.success({ msg: '欢迎回来',
      data: {
        user,
      },
    });
  }

  async setPassword() {
    const { ctx } = this;
    const { password } = ctx.permitAndValidateParams({
      password: {
        type: 'string',
        required: true,
      },
    });
    await ctx.model.User.update({ password }, {
      where: { id: ctx.session.user.id },
    });
    this.success({ msg: '重设成功' });
  }
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const user = await ctx.model.User.create({ name: 'test' });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
