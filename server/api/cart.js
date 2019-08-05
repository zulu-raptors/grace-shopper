const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models/index')

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'created'
      },
      include: [Product]
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'created'
      }
    })
    if (!order) {
      let order = await Order.create({
        userId: req.user.id,
        status: 'created',
        include: [Product]
      })
      let cart = await OrderProduct.create({
        orderId: order.dataValues.id,
        productId: req.body.productId,
        quantity: req.body.quantity
      })
      order.products.order_product = cart
      res.send(order)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
