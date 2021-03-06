const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const OrderProduct = require('./order_product')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Order.belongsTo(User)
User.hasMany(Order)

OrderProduct.belongsTo(Order)
Order.hasMany(OrderProduct)

Order.belongsToMany(Product, {through: 'order_product', foreignKey: 'orderId'})
Product.belongsToMany(Order, {
  through: 'order_product',
  foreignKey: 'productId'
})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  OrderProduct,
  Product
}
