require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { response } = require("express");

app.use(express.static("build"));
app.use(cors());

const baseUrl = "/api/persons";

morgan.token("content", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

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

app.get("/", (req, res) => {
  res.send("<h1>Phonebook (see /api/persons/ for numbers)</h1>");
});

app.get(`${baseUrl}`, (req, res) => {
  Person.find({}).then((result) => {
    res.json(result.map((person) => person.toJSON()))
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((docs) => {
    response.send(
      `<p>Phonebook has info for ${docs} people </p><p>${new Date()}</p>`
    );
  });
});

app.get(`${baseUrl}/:id`, (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person.toJSON());
    } else {
      response.status(404).end();
    }
  });
});

app.delete(`${baseUrl}/:id`, (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((result) => {
    response.status(204).end();
  })
});

// const generateId = () => {
//   const maxId =
//     phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post(`${baseUrl}`, (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  Person.findOne({ name: body.name }).then((user) => {
    if (user) {
      return response.status(400).json({
        error: "name already exists",
      });
    }
  });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
