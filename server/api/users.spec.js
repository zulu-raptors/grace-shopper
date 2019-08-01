/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = require('../db/models/user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const cody = {
      email: 'cody@puppybook.com',
      firstName: 'Cody',
      lastName: 'ThePug'
    }

    beforeEach(() => {
      return User.create(cody)
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(cody.email)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
