const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <>
      filter shown with
      <input value={nameFilter} onChange={handleNameFilterChange} />
    </>
  );
};

export default Filter;
