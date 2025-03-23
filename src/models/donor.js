const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Donor = sequelize.define('Donor', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  bloodType: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

module.exports = Donor;