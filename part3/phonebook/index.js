require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))

const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())

const baseUrl = '/api/persons'

morgan.token('content', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ''
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
  )
)

// let phonebook = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];


app.get(`${baseUrl}`, (req, res) => {
  Person.find({}).then((result) => {
    res.json(result.map((person) => person.toJSON()))
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then((docs) => {
    response.send(
      `<p>Phonebook has info for ${docs} people </p><p>${new Date()}</p>`
    )
  })
})

app.get(`${baseUrl}/:id`, (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete(`${baseUrl}/:id`, (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// const generateId = () => {
//   const maxId =
//     phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post(`${baseUrl}`, (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error)) // validation errors
})

app.put(`${baseUrl}/:id`, (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((person) => {
      response.json(person.toJSON())
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
