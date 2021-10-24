const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const promises = userObjects.map(user => user.save())
  await Promise.all(promises)
})


describe('BASIC OPERATIONS', () => {
  test('users are returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('expect correct number of entries', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('the first username checks', async () => {
    const response = await api.get('/api/users')

    const usernames = response.body.map(r => r.username)
    expect(usernames).toContain(helper.initialUsers[0].username)
  })

  test('we can add users', async () => {
    const newUser = { username: "newuser", password: "1337" }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedUsers = await helper.usersInDb()

    expect(updatedUsers.length).toBe(helper.initialUsers.length + 1)
    const usernames = updatedUsers.map(r => r.username)
    expect(usernames).toContain(newUser.username)
  })
}, 100000)



afterAll(() => {
  mongoose.connection.close()
})