const Numbers = ({ persons, nameFilter }) => {
  const insensitiveIncludes = (a, b) => {
    return a.toLowerCase().includes(b.toLowerCase());
  };

  const shownPersons = persons.filter((person) =>
    insensitiveIncludes(person.name, nameFilter)
  );

  return (
    <>
      <h2>Numbers</h2>
      {shownPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Numbers;
