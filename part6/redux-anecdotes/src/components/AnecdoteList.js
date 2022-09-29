import { connect } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyAnecdote } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
	useEffect(() => {    
			props.initializeAnecdotes()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  const vote = (anecdote) => {
		props.voteAnecdote(anecdote)
		props.notifyAnecdote(`you voted '${anecdote.content}'`, 5)
  }

  return(
		<>
			{props.anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</>
  )
}

const mapStateToProps = (state) => {
	const anecdotes = state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  return {
		anecdotes
  }
}
const mapDispatchToProps = {
	initializeAnecdotes,
	voteAnecdote,
	notifyAnecdote,
}

const ConnectedAnecdoteList = connect(
	mapStateToProps, 
	mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
