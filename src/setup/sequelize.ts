import { Sequelize } from 'sequelize';
import appConfig from '../config/appConfig';

const sequelize: Sequelize = new Sequelize(appConfig.POSTGRESQL.DB, appConfig.POSTGRESQL.USER, appConfig.POSTGRESQL.PASSWORD, {
  host: appConfig.POSTGRESQL.URL,
  dialect: appConfig.POSTGRESQL.DIALECT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function checkDBConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export {
  sequelize,
  checkDBConnection,
};
