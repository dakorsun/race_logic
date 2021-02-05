// @ts-ignore
const { sequelize } = require('../../setup/sequelize');
require('../../models');

sequelize.drop({ cascade: true })
  .then(() => {
    console.log('Database tables successfully dropped');
    process.exit(0);
  })
  .catch((error: string) => {
    console.error(error);
    process.exit(1);
  });
