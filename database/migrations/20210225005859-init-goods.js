'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { STRING, UUID, UUIDV4, DATE, INTEGER } = Sequelize;
    await queryInterface.createTable('goods', {
      id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
      name: STRING(30),
      des: STRING,
      avatar: STRING,
      created_at: DATE,
      updated_at: DATE,
      is_delete: { type: INTEGER, defaultValue: 0, comment: '0正常 1删除' },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('goods');
  },
};
