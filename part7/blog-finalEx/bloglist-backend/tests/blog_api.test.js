const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const app = require('../app')
const { Logger } = require('mongodb')

const api = supertest(app)

beforeEach(async () => {
  //1os tropos
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)


  await User.deleteMany({})

  const testuser = {
    username: "Jjake",
    password: "123j54jhk6568",
    name: "Jake Watjson"
  }

  await api.post('/api/users').send(testuser)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: testuser.username, password: testuser.password })

  auth_TOKEN = "Bearer " + loginResponse.body.token
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('blog has property id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})


test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Learning React',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', auth_TOKEN)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(newBlog.title)
})

  / test('if likes undefined, set to 0', async () => {
    const newBlog = {
      title: 'Learning Node.js',
      author: 'University of Helsinki',
      url: 'https://fullstackopen.com',
    }

    const checkBlog = {
      title: 'Learning Node.js',
      author: 'University of Helsinki',
      url: 'https://fullstackopen.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', auth_TOKEN)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const result = response.body[response.body.length - 1]
    console.log(result) //the newBlog that was added 
    expect(result.likes).toBe(checkBlog.likes)
  }, 1000)


test('if title or url empty', async () => {
  const newBlog = {
    title: 'Learning Express',
    author: 'University of Helsinki',
    likes: 10
  }

  await await api
    .post('/api/blogs')
    .set('Authorization', auth_TOKEN)
    .send(newBlog)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})