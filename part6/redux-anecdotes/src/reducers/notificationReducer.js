import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	message: undefined
}

const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		notify(state, action) {
			state.message = action.payload
		},
		clear(state, action) {
			state.message = undefined
		}
	}
})

let timeoutID = undefined

export const notifyAnecdote = (message, seconds) => {
	return async dispatch => {
		dispatch(notify(message))
		if (typeof timeoutID === 'number') {
			clearTimeout(timeoutID);
		}
		timeoutID = setTimeout((message) => {
			dispatch(clear())
		}, seconds * 1000);
	}
}


export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer
