import numberService from "../services/numbers";

const Numbers = ({ persons, nameFilter, setPersons, setNotification, setSuccess }) => {
  const insensitiveIncludes = (a, b) => {
    return a.toLowerCase().includes(b.toLowerCase());
  };

  const shownPersons = persons.filter((person) =>
    insensitiveIncludes(person.name, nameFilter)
  );

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      numberService.deleteNumber(person.id).then((data) => {
        setPersons(persons.filter(x => x.name !== person.name));
        setNotification(`Removed phone number of ${person.name}`, false);
        setSuccess(false);
        setTimeout(() => {
          setNotification(undefined);
        }, 5000);
      });
    }
  };

  return (
    <>
      <h2>Numbers</h2>
      {shownPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => removePerson(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Numbers;
