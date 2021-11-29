const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')


const getTokenFrom = request => {
  logger.info(request.get('authorization'))
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs.map(blog => blog.toJSON()))

  /* Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    }) */
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }

  // Blog.findById(req.params.id)
  //     .then(blog => {
  //         if (blog) {
  //             res.json(blog)
  //         } else {
  //             res.status(404).end()
  //         }
  //     })
  //     .catch(error => next(error))
})

blogsRouter.post('/', async (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  //const token = getTokenFrom(req) //take  token from function

  logger.info('this is not token', req.token)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)   //take token from middleware
  logger.info('DECODED TOKEN ', decodedToken)
  if (!req.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes === undefined ? 0 : req.body.likes,
    user: user._id
  })

  const savedBlog = await blog.save() //first blog is saved

  user.blogs = user.blogs.concat(savedBlog._id) //then blog is assigned to his/her user
  await user.save()

  res.json(savedBlog.toJSON())

  /* const blog = new Blog(req.body)
  blog
    .save()
    .then(result => {
      res.status(201).json(result)
      res.json(savedBlog.toJSON())
    }) */
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  const newBlog = await Blog
    .findByIdAndUpdate(req.params.id, blog, { new: true })
    .populate('user')

  res.json(newBlog.toJSON())

  // Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  //     .then(updatedBlog => {
  //         res.json(updatedBlog)
  //     })
  //     .catch(error => next(error))
})

blogsRouter.delete('/:id', async (req, res) => {
  const requestingUser = req.user


  const requestedBlog = await Blog.findById(req.params.id)

  if (requestedBlog.user.toString() == requestingUser._id.toString()) {
    logger.info("deletion allowed")
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(403).end()
  }

  // Blog.findByIdAndRemove(req.params.id)
  //     .then(result => {
  //         res.status(204).end()
  //     })
  //     .catch(error => next(error))
})

module.exports = blogsRouter