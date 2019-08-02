const router = require('express').Router()
const {User, Order} = require('../db/models')
const {isLoggedIn, isAdmin, isUserOrAdmin} = require('./gatekeeper')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin', 'firstName', 'lastName'],
      include: [Order]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isUserOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Order]
    })
    res.json({
      id: user.id,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  } catch (err) {
    next(err)
  }
})

//to get a specific users orders
router.get('/:id/orders', isUserOrAdmin, async (req, res, next) => {
  try {
    const userId = req.params.id
    const orders = await Order.findAll({
      where: {
        userId
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//to use for our sign up form

router.post('/', async (req, res, next) => {
  try {
    await User.create(req.body)
  } catch (error) {
    next(error)
  }
})

//route for creating new order
router.post('/:id/orders', isUserOrAdmin, async (req, res, next) => {
  try {
    const newOrder = req.body
    newOrder.userId = req.params.id
    const order = await Order.create(newOrder)
    res.json(order)
  } catch (error) {
    next(error)
  }
})
