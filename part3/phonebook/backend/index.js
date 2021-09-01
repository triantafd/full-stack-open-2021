require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


//PORT
const PORT = process.env.PORT || 3001
console.log(process.env.PORT)

//Models
const Person = require('./models/person')


app.use(cors())
app.use(express.json()) // for request.body to work
app.use(express.static('build'))


morgan.token('body', (req) => {
  const body = JSON.stringify(req.body)
  if (body === JSON.stringify({})) {
    return ''
  }
  else {
    return body
  }
})

app.use(morgan(':method :url :status :req[body] - :response-time ms :body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

console.log(persons)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  /* response.json(persons) */
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
  personsEntries = persons.length
  response.send(`
  <div>
  <p>Phonebook has info for ${personsEntries} people</p> 
  <p>${new Date()}</p> 
  </div>`
  )
})


app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  /* const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  } */
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
      /* response.status(500).end()
      response.status(400).send({ error: 'malformatted id' }) */
    })
})

//...


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  /* console.log(persons)
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  response.status(204).end() */
})

/* const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
} */

const generateId = () => {
  let id = Math.floor(Math.random() * Math.floor(100000))
  return id
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('Body is ', body)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  /* const isUnique = persons.find(person => person.name === body.name)
  if (isUnique) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } 
  
    const person = {
    number: body.number,
    name: body.name,
    id: generateId(),
  }
  persons = persons.concat(person)
  response.json(person)

  */

  const person = new Person({
    name: body.name,
    number: body.number,
    //id: generateId()
  })
  person.save()
    .then(savedPerson => {
      console.log('Saved person is', savedPerson)
      console.log('Saved person json ', savedPerson.toJSON())
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

//Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error)
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})