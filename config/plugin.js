'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  parameters: {
    enable: true,
    package: 'egg-parameters',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
};
