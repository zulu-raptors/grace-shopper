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

// router.post('/', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'created'
//       }
//     })
//     if (!order) {
//       let order = await Order.create({
//         userId: req.user.id,
//         status: 'created',
//         include: [Product, OrderProduct]
//       })
//       let cart = await OrderProduct.create({
//         orderId: order.dataValues.id,
//         productId: req.body.productId,
//         quantity: req.body.quantity
//       })
//       order.products.order_product = cart
//       res.send(order)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  const uId = req.user ? req.user.id : null
  const uInfo = req.body.info
  const cart = req.body.cart
  if (cart) {
    try {
      let order = await Order.findOrCreate({
        where: {
          userId: uId,
          status: 'created'
        },
        defaults: uInfo
      })

      let created = []
      let total = 0
      cart.forEach(item => {
        created.push({
          orderId: order[0].dataValues.id,
          productId: item.id,
          quantity: Number(item.quantity)
        })
        total += item.quantity * item.price
      })
      await OrderProduct.bulkCreate(created)
      await Order.update(
        {
          total: total,
          status: 'completed'
        },
        {
          where: {
            id: order[0].dataValues.id
          }
        }
      )
      res.send(order)
    } catch (err) {
      next(err)
    }
  }
})

module.exports = router
