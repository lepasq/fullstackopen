import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyAnecdote } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter}) => 
		anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
	)

	useEffect(() => {    
			dispatch(initializeAnecdotes())
	}, [dispatch])

  const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote))
		dispatch(notifyAnecdote(`you voted '${anecdote.content}'`, 5))
  }

  return(
		<>
			{anecdotes.map(anecdote =>
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

export default AnecdoteList
