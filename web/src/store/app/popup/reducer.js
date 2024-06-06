import {createSlice} from '@reduxjs/toolkit'

//button : {id, callback, label}

const popupSlice = createSlice({

	name: 'popupSlice',

	initialState:{

		is_open: false,
		label: null,
		prompt: null,
		inputs:[],
		component: {}
	},

	reducers:{

		togglePopup : (state, action) =>{

			if(state.is_open){

				state.is_open = false
				state.inputs = []
				state.component = {name: null}

			}
			else{

				const {label, prompt, inputs, component} = action.payload

				state.is_open = true
				state.label = label 
				state.prompt = prompt 
				state.inputs = inputs
				state.component = component
			}
		},
	}
})

export const {togglePopup} = popupSlice.actions

export default popupSlice.reducer
