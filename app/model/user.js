'use strict';
module.exports = app => {
  const { STRING, DATE, UUID, UUIDV4, INTEGER } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    name: STRING(30),
    mobile: { type: STRING, unique: true },
    password: STRING,
    createdAt: DATE,
    updatedAt: DATE,
    isDelete: { type: INTEGER, defaultValue: 0, comment: '0正常 1删除' },
  }, {
    defaultScope: {
      attributes: {
        // 排除密码，不返回密码
        exclude: [ 'password' ],
      },
    },
  });

  return User;
};
