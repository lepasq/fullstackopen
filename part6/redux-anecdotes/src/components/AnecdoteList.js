import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote, set } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes' 

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter}) => 
		anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
	)

	useEffect(() => {    
		anecdoteService      
			.getAll().then(notes => 
				dispatch(set(notes)))  
	}, [dispatch])

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
