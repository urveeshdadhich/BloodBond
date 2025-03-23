const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected Successfully');
    await sequelize.sync();
  } catch (error) {
    console.error('PostgreSQL Connection Error:', error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectToDatabase };