/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,

  ZZSAPPID,
  ZZSAPPSECRET,

  REDIS_HOST,
  REDIS_PORT,
  REDIS_AUTH,
  REDIS_DB,
} = require('../private');
const {
  NoLogin,
} = require('../app/error/index');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614173920207_7097';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.sequelize = {
    dialect: 'mysql',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    timezone: '+08:00',
  };
  config.redis = {
    client: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_AUTH,
      db: REDIS_DB,
    },
    agent: true,
  };
  config.cors = {
    origin: 'http://localhost:8080',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  config.parameters = {
    logParameters: true,
    // param names that you want filter in log.
    filterParameters: [ 'password' ],
  };
  config.zhenZiYun = {
    appId: ZZSAPPID,
    appSecret: ZZSAPPSECRET,
  };
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };

  config.onerror = {
    json(err, ctx) {
      if (err instanceof NoLogin) {
        ctx.status = 401;
        ctx.body = {
          msg: '请先登录',
        };
        return;
      }
      ctx.body = {
        msg: err.message,
      };
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
