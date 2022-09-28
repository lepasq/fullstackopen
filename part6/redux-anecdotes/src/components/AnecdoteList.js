import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter}) => 
		anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
	)

	console.log(anecdotes)

  const voteAnecdote = (anecdote) => {
		dispatch(vote(anecdote.id))

		dispatch(notify(`you voted '${anecdote.content}'`))
		setTimeout(() => {
				dispatch(clear())
		}, 5000);
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
						<button onClick={() => voteAnecdote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</>
  )
}

export default AnecdoteList
