'use strict'

const supertest = require('supertest')
const httpStatus = require('http-status')

const app = require('../index')
const User = require('../api/user/user.model')
let user_id;

afterAll((done) => {
  User.findByIdAndDelete(user_id)
    .then(() => done())
    .catch(done)
})

describe('User API specs', () => {

  const userData = {
    username: 'rohan_newuser',
    mobileNumber: '1234567890',
    password: 'password'
  }

  describe('POST /api/users', () => {
    test('should create new user', (done) => {
      supertest(app)
        .post('/api/users')
        .send(userData)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).toHaveProperty('_id')
          user_id = res.body._id
          expect(res.body.username).toEqual(userData.username)
          expect(res.body.mobileNumber).toEqual(userData.mobileNumber)
          expect(res.body).not.toHaveProperty('password')
          return done()
        })
        .catch(done)
    })
    test('should return - duplicate key error', (done) => {
      supertest(app)
        .post('/api/users')
        .send(userData)
        .expect(httpStatus.BAD_REQUEST)
        .then(() => done())
        .catch(done)
    })
  })
})