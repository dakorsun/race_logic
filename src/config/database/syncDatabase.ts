// @ts-ignore
const { sequelize } = require('../../setup/sequelize');
require('../../models');

sequelize.drop({ cascade: true })
  .then(() => sequelize.sync())
  .then(() => {
    console.log('Database tables successfully created');
    process.exit(0);
  })
  .catch((error: string) => {
    console.error(error);
    process.exit(1);
  });
