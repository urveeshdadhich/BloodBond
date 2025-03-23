const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import Sequelize instance

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'unread',
  },
}, {
  timestamps: true,
});

module.exports = Contact;
