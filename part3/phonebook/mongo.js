const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.dlhnzue.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const addPerson = () => {
  const argName = process.argv[3]
  const argNumber = process.argv[4]

  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({
        name: argName,
        number: argNumber,
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${argName} number ${argNumber} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}


const getPersons = () => {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('phonebook:')

      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
    })
    .catch((err) => console.log(err))
}


if(process.argv.length === 3) {
    getPersons();
} else if (process.argv.length === 5) {
    addPerson()
} else {
    console.log("Wrong amount of arguments.\nRun 'node mongo.js <password>' to retrieve users or 'node mongo.js <password> <name> <number>' to add user")
}

