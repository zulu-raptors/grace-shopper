const router = require('express').Router
const {Order, User, Product, OrderProduct} = require('../db/models')
const {isLoggedIn, isAdmin, isUserOrAdmin} = require('./gatekeeper')

module.exports = router
