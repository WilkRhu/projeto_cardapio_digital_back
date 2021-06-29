const sql = `insert into PermissionEnum (id, permission) values
("1", "all"),
("2", "view"),
("3", "create"),
("4", "edit"),
("5", "deleted"),
("6", "alter_permission")
`;

module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(sql),
};
