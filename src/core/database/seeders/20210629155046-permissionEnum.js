const sql = `INSERT INTO PermissionEnumEntities (id, permission) VALUES
("1", "all"),
("2", "view"),
("3", "create"),
("4", "edit"),
("5", "deleted"),
("6", "alter_permission")
`;

const sqlDeleted = `drop table PermissionEnumEntities`;

module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(sql),
  down: (queryInterface) => queryInterface.sequelize.query(sqlDeleted),
};
