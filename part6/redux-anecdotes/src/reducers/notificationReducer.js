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


export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer
