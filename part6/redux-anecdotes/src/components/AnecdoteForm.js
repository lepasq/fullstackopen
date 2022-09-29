import { connect } from 'react-redux'
import { notifyAnecdote } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
	const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
		event.target.anecdote.value = ''

    props.createAnecdote(content)
		props.notifyAnecdote(`anecdote has been created: ${content}`, 5)
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

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = {
	createAnecdote,
	notifyAnecdote,
}

const ConnectedAnecdoteForm = connect(
	mapStateToProps, 
	mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
