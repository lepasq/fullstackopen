import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const voteAnecdote = (id) => {
		dispatch(vote(id))
  }

  return(
		<>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</>
  )
}

export default AnecdoteList
