import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const sortAnecdotes = (anecdotes) => anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

const initialState = []

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
		case 'APPEND':
			return sortAnecdotes(state.concat(action.data))
		case 'SET':
			return sortAnecdotes(action.data)
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

export const create = (name, id) => {
	return {
    type: 'CREATE',
    data: {
      content: name,
			id: id,
			votes: 0
    }
  }
}

export const append = (anecdote) => {
	return {
		type: 'APPEND',
		data: anecdote
	}
}

export const set = (anecdotes) => {
	return {
		type: 'SET',
		data: anecdotes
	}
}

export const initializeAnecdotes = () => {  
	return async dispatch => {    
		const anecdotes = await anecdoteService.getAll()    
		dispatch(set(anecdotes))  
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {    
		const id = getId()
		const anecdote = await anecdoteService.createNew(content, id)    
		dispatch(append(anecdote))  
	}
}

export const voteAnecdote = (anecdote) => {
	return async dispatch => {
		const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
		await anecdoteService.vote(newAnecdote)
		dispatch(vote(newAnecdote.id))
	}
}

export default reducer
