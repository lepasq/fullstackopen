import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log(users)

  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>

          {users.map(x => (
            <tr key={x.username}>
              <td> <Link to={x.id}>{x.name}</Link> </td>
              <td>{x.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
