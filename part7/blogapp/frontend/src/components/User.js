import { useState, useEffect } from 'react'

import {
  useParams,
} from 'react-router-dom'

const User = ({ users }) => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    if(users.length > 0) {
      setUser(users.find(x => userId === x.id))
    }
  }, [users])

  if(user === null) {
    return <></>
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((x,i) => <li key={i}>{x.title}</li>)}

      </ul>
    </>
  )
}

export default User
