import { useDispatch } from 'react-redux'
import { create, getId } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes' 

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

	const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

		const id = getId()
		anecdoteService.createNew(content, id).then(() => {
			dispatch(create(content, id))
			dispatch(notify(`anecdote has been created: ${content}`))
		})
		
		setTimeout(() => {
				dispatch(clear())
		}, 5000);
	}

  return (
		<>
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div><input name="anecdote" /></div>
				<button type="submit">create</button>
			</form>
		</>
  )
}

export default AnecdoteForm
