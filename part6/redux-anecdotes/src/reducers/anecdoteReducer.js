const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = (anecdotes) => anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

const initialState = sortAnecdotes(anecdotesAtStart.map(asObject))

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'VOTE':
			const id = action.data.id
			const anecdoteToChange = state.find(n => n.id === id)
			const changedAnecdote = { 
				...anecdoteToChange, 
				votes: anecdoteToChange.votes + 1 
			}
			return sortAnecdotes(state.map(a =>
				a.id !== id ? a : changedAnecdote 
			))
		case 'CREATE':
			return sortAnecdotes(state.concat(action.data))
		default: return state;
	}
}

export const vote = (id) => {
	return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const create = (name) => {
	return {
    type: 'CREATE',
    data: {
      content: name,
			id: getId(),
			votes: 0
    }
  }
}



export default reducer
