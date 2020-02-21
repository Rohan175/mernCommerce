'use strict'

const supertest = require('supertest')
const httpStatus = require('http-status')

const app = require('../index')

const User = require('../api/user/user.model')
let token;

afterAll((done) => {
  User.deleteMany({})
    .then(() => done())
    .catch(done)
})


const userData = {
  password: "password",
  username: 'rohan_prod',
  mobileNumber:"9427173216"
}

describe('Test login', () => {
  test('should create new user', (done) => {
    supertest(app)
      .post('/api/users')
      .send(userData)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('_id')
        expect(res.body.username).toEqual(userData.username)
        expect(res.body.mobileNumber).toEqual(userData.mobileNumber)
        expect(res.body).not.toHaveProperty('password')
        return done()
      })
      .catch(done)
  })

  test('login', async (done) => {
    supertest(app).post('/api/auth/login').send(userData).then(res => {
      token = res.body.token
      console.log(res.body)
      return done()
    })
  })
})
// const token = JWToken.create(userData, '10m')
//let productData = {qty:10};

describe('Test product cart flow', () => {

    test('should return products ', async (done) => {
      supertest(app)
        .get(`/api/products`)
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(Array.isArray(res.body.data)).toBeTruthy()
          expect(res.body.data[0]).toHaveProperty('_id')
          expect(res.body.data[0]).toHaveProperty('productname')
          expect(res.body.data[0]).toHaveProperty('price')
          
          // const product = res.body.data[0]
          // productData.productId = product._id
          // productData.price = product.price
          // productData.name= product.productname
          return done()

        })
        .catch(done)
    })
  })

  describe('cart', () =>{
    const productData = {productId:"5e4c1d94279aa014cc5f8d04",
    qty:2,
    price:3000,
    name:"prod1"}

    test('should post new item to cart', (done) => {
      supertest(app)
        .post('/api/cart/add')
        .set('Authorization', `Bearer ${token}`)
        .send(productData)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(Array.isArray(res.body.items)).toBeTruthy()
          return done()
        })
        .catch(done)
    })

    
    test('should sub item to cart', (done) => {
      supertest(app)
        .post('/api/cart/sub')
        .set('Authorization', `Bearer ${token}`)
        .send(productData)
        .expect(httpStatus.OK)
        .then((res) => {
          return done()
        })
        .catch(done)
    })


  test('should get cart ', async (done) => {
    supertest(app)
      .get(`/api/cart`)
      .set('Authorization', `Bearer ${token}`)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(Array.isArray(res.body.data)).toBeTruthy()
        return done()
      })
      .catch(done)
  })
  })