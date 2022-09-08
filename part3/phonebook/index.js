const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
//app.use(cors)

const baseUrl = "/api/persons"

morgan.token('content', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : '';
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let phonebook = [
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


app.get('/', (req, res) => {
  res.send('<h1>Phonebook (see /api/persons/ for numbers)</h1>')
})

app.get(`${baseUrl}`, (req, res) => {
  res.json(phonebook)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length} people </p><p>${new Date()}</p>`)
})


app.get(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  response.status(204).end()
})



const generateId = () => {
  const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(n => n.id))
    : 0
  return maxId + 1
}

app.post(`${baseUrl}`, (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if((phonebook.filter(person => person.name === body.name)).length > 0) {
    return response.status(400).json({ 
      error: 'name already exists' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  phonebook = phonebook.concat(person)
  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
