import { useEffect, useState } from "react";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import Form from "./components/Form";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456", id: 1 },
    // { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log(response)
      setPersons(response.data)
    })
  }, [])

  const addNumber = (event) => {
    event.preventDefault();
    if (persons.filter((x) => x.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = { name: newName, number: newNumber };
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />

      <h3> Add a new </h3>

      <Form
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Numbers persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
