const sqlCreated = `
create table PermissionEnum (
  id int(11), 
  permission enum(
    'all', 'view', 'create', 'deleted', 'edit', 'alter_permission'
  )
);

`;

const sqlDeleted = `drop table PermissionEnum`;

module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(sqlCreated),
  down: (queryInterface) => queryInterface.sequelize.query(sqlDeleted),
};
