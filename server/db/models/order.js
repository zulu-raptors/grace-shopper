const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  cardHolder: {
    type: Sequelize.STRING
  },
  cardNumber: {
    type: Sequelize.STRING
  },
  expired: {
    type: Sequelize.STRING
  },
  cvv: {
    type: Sequelize.INTEGER
  },
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  paymentMethod: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('created', 'completed')
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  sessionId: {
    type: Sequelize.STRING
  }
})

module.exports = Order
