const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = require('../db/models/product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

describe('/api/products/', () => {
  const newBeer = {
    name: 'Premium Pils',
    brand: 'Best Beer Brand',
    description: 'The Best Beer Around',
    price: 2000
  }

  beforeEach(() => {
    return Product.create(newBeer)
  })

  it('GET /api/products', async () => {
    const res = await request(app)
      .get('/api/products')
      .expect(200)

    expect(res.body).to.be.an('array')
    expect(res.body[0].name).to.be.equal(newBeer.name)
  })
})
