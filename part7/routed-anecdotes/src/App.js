import { useState } from 'react'
import { useField } from './hooks/index'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={message ? style : null}>
			{message}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}/>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => (
	<li key={anecdote.id} >
		<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
	</li>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)


const Footer = () => (

  <div>
		Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
		See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

	const contentField = useField('content')
	const authorField = useField('author')
	const urlField = useField('url')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
			content: contentField.value,
      author: authorField.value,
      url: urlField.value,
      votes: 0
    })
  }

	const resetFields = () => {
		authorField.reset()
		contentField.reset()
		urlField.reset()
	}

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={contentField.value} onChange={contentField.onChange} />
        </div>
        <div>
          author
          <input name='author' value={authorField.value} onChange={authorField.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={urlField.value} onChange={urlField.onChange} />
        </div>
        <button>create</button>
      </form>
			<button onClick={() => resetFields()}>reset</button>
    </div>
  )

}

const App = () => {
	const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
		setNotification(`new anecdote ${anecdote.content} has been created`)
    navigate(`/anecdotes/`)
		setTimeout(() => {
			setNotification(null)
		}, 5000)
  }

  const match = useMatch('/anecdotes/:id')

	const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  return (
		<div>
		<h1>Software anecdotes</h1>
		<Notification message={notification} />
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/about">about</Link>
        <Link style={padding} to="/new">create new</Link>
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}  />} />
        <Route path="/anecdotes/" element={<AnecdoteList anecdotes={anecdotes}  />} />
				<Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/about" element={<About />} />
				<Route path="/new" element={<CreateNew addNew={(anecdote) => addNew(anecdote)}/>} />
      </Routes>
			<Footer />
    </div>
  )
}

//<Route path="/new" element={user ? <CreateNew addNew={undefined}/> : <Navigate replace to="/login" />} />
//<Route path="/login" element={<Login onLogin={login} />} />
        //{user
          //? <em>{user} logged in</em>
          //: <Link to="/login">login</Link>
        //}


const RouterApp = () => (
	<Router><App/></Router>
)

export default RouterApp
