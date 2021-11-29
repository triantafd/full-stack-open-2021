require('dotenv').config()
const data = require('./data/data')

const { ApolloServer, gql, UserInputError, ForbiddenError } = require('apollo-server')
//const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

/* const authors = data.authors
const books = data.books */

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    born: String
    id: ID!
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String
      genres: [String]
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    allGenres: [String!]
    me: User
    favoriteGenre: String!
  }

  type Subscription {
    bookAdded: Book!
  }  

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      if (args.author && args.genre) {
        return books.filter(
          book =>
            book.author === args.author &&
            book.genres.includes(args.genre)
        )
      } else if (args.author) {
        console.log(books, args.author, args.genre)
        return books.filter(book => book.author.name === args.author)
      } else if (args.genre) {
        const booksToReturn = books.filter(book => book.genres.includes(args.genre))
        return booksToReturn
      } else {
        return books
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(author => ({
        name: author.name,
        born: author.born,
        bookCount: books.filter((book) => book.author.toString() === author._id.toString()).length,
        //id: uuid()
      }))
    },
    allGenres: async () => {
      const allBooks = await Book.find()
      let allGenres = new Set()
      allBooks.forEach(book =>
        book.genres.forEach(genre =>
          allGenres.add(genre)
        )
      )
      return Array.from(allGenres)
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    favoriteGenre: (root, args, context) => {
      return context.currentUser.favoriteGenre
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new ForbiddenError('not authenticated')
      }
      /*  const books = await Book.find({})
       book = books.find(book => book.title.toString() === args.title.toString()) */
      const bookExists = await Book.findOne({ title: args.title.toString() })
      if (bookExists) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.title
        })
      }


      /* const author = authors.find(author => author.name.toString() === args.author.toString())
      if (!author) {
        const curAuthor = {
          "name": args.author,
          "bookCount": 1,
          "born": null,
          "id": uuid()
        }
        authors = authors.concat(curAuthor)
      }  */

      let author = await Author.findOne({ name: args.author.toString() })
      if (!author) {
        author = new Author({ name: args.author, born: null })
      }

      /* const book = { ...args, id: uuid() }
      books = books.concat(book) */


      const newBook = new Book({ ...args, author: author._id })
      const savedBook = await newBook.save()
      author.books = author.books.concat(savedBook._id)
      await author.save()

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook.populate('author') })

      return savedBook.populate('author')
    },

    editAuthor: async (root, args, { currentUser }) => {
      //const curAuthor = authors.find(author => author.name === args.name)
      //authors = authors.map(author => curAuthor.name === author.name ? curAuthor : author)
      if (!currentUser) {
        throw new ForbiddenError('not authenticated')
      }
      if (!args.name || !args.setBornTo) {
        throw new UserInputError('arguments missing', {
          invalidArgs: args
        })
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('Wrong Credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      // return jwt token if user-pass pair matches
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    /*     Author: {
          name: (root) => root.name,
          born: (root) => root.born,
          bookCount: (root) => root.bookCount,
          id: (root) => root.id
        },
    
        Book: {
          title: (root) => root.title,
          published: (root) => root.published,
          author: (root) => root.author,
          genres: (root) => root.genres,
          id: (root) => root.id
        } */
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})