import { useEffect, useState } from "react";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import Form from "./components/Form";
import numberService from "./services/numbers";
import Notification from "./components/Notification";

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
  const [notification, setNotification] = useState(undefined);
  const [success, setSuccess] = useState(true);

  const notify = (msg, success) => {
    setNotification(msg);
    setSuccess(success);
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };

  useEffect(() => {
    numberService.getPersons().then((data) => setPersons(data));
  }, []);

  const updateState = (p) => {
    setPersons(p);
    clearInput();
  };

  const clearInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const addNumber = (event) => {
    event.preventDefault();
    const duplicate = persons.filter((x) => x.name === newName);
    if (duplicate.length > 0) {
      if (
        window.confirm(
          `${duplicate[0].name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        numberService
          .updateNumber(duplicate[0], newNumber)
          .then((data) => {
            const newPersons = [...persons];
            newPersons[persons.findIndex((x) => x === newName)] = data;
            notify(`Updated number of ${newName}`, true);
            updateState(newPersons);
          })
          .catch((err) => {
            notify(`Could not update phone number of ${newName}`, false);
            clearInput();
          });
      }
    } else {
      const person = { name: newName, number: newNumber };
      numberService.addNumber(person).then((data) => {
        notify(`Added ${newName}`, true);

        updateState(persons.concat(data));
      });
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
      {notification && (
        <Notification message={notification} success={success} />
      )}

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
      <Numbers
        persons={persons}
        nameFilter={nameFilter}
        setPersons={setPersons}
        setNotification={setNotification}
        setSuccess={setSuccess}
      />
    </div>
  );
};

export default App;
