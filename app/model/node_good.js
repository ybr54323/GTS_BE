'use strict';
module.exports = app => {
  const { DATE, UUID, UUIDV4, INTEGER } = app.Sequelize;

  const NodeGood = app.model.define('users_nodes', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    node_id: { type: UUID, allowNull: false },
    good_id: { type: UUID, allowNull: false },
    created_at: DATE,
    updated_at: DATE,
    is_delete: { type: INTEGER, defaultValue: 0, comment: '0正常 1删除' },
  });
  return NodeGood;
};
