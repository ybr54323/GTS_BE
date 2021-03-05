'use strict';
module.exports = app => {
  const { DATE, UUID, UUIDV4, INTEGER } = app.Sequelize;

  const UserNode = app.model.define('users_nodes', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    user_id: { type: UUID, allowNull: false },
    node_id: { type: UUID, allowNull: false },
    created_at: DATE,
    updated_at: DATE,
    is_delete: { type: INTEGER, defaultValue: 0, comment: '0正常 1删除' },
    read_only: { type: INTEGER, defaultValue: 0, comment: '0只读 1读写' },
  });
  return UserNode;
};
