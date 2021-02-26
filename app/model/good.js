'use strict';
module.exports = app => {
  const { STRING, DATE, UUID, UUIDV4, INTEGER } = app.Sequelize;

  const Good = app.model.define('goods', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    name: STRING(30),
    des: STRING,
    avatar: STRING,
    created_at: DATE,
    updated_at: DATE,
    is_delete: { type: INTEGER, defaultValue: 0, comment: '0正常 1删除' },
  });
  return Good;
};
