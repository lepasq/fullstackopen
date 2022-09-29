import { useDispatch } from 'react-redux'
import { notifyAnecdote } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

	const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
		event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
		dispatch(notifyAnecdote(`anecdote has been created: ${content}`, 5))
	}

  return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name="anecdote" /></div>
				<button type="submit">create</button>
			</form>
		</>
  )
}

export default AnecdoteForm
