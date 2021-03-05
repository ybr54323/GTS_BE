'use strict';
const Good = require('./good');
module.exports = app => {
  const { STRING, DATE, UUID, UUIDV4, INTEGER } = app.Sequelize;

  const Node = app.model.define('nodes', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    name: STRING(30),
    parent_id: { type: UUID, allowNull: true },
    created_at: DATE,
    updated_at: DATE,
    is_delete: { type: INTEGER, defaultValue: 0, comment: '0正常 1删除' },
  });
  Node.hasMany(Good, { through: 'nodes_goods' });
  return Node;
};
