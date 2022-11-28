import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <div>
            <Form.Label>title</Form.Label>
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              id="title"
              placeholder="title of the blog"
            />
          </div>
          <div>
            <Form.Label>author</Form.Label>
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              id="author"
              placeholder="author of the blog"
            />
          </div>
          <div>
            <Form.Label>url</Form.Label>
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              id="url"
              placeholder="url of the blog"
            />
          </div>
          <Button id="create-butto" type="submit">
          create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlogForm
