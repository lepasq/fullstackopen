import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className="container">
      <h2>Log in to application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <div>
            <Form.Label>username</Form.Label>
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              id="username"
            />
          </div>
          <div>
            <Form.Label>password</Form.Label>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="password"
            />
          </div>
          <Button variant="primary" id="login-button" type="submit">
          login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
