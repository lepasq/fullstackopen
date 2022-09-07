import axios from "axios";

const url = "http://localhost:3001/persons";

const getPersons = () => axios.get(url).then((response) => response.data);

const addNumber = (person) =>
  axios.post(url, person).then((response) => response.data);

const deleteNumber = (id) =>
  axios.delete(`${url}/${id}`).then((response) => response.data);

const updateNumber = (person, newPhone) => {
  person.number = newPhone;
  return axios.put(`${url}/${person.id}`, person).then((response) => response.data);
};

export default {
  deleteNumber,
  getPersons,
  addNumber,
  updateNumber,
};
