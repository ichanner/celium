import {createSlice} from '@reduxjs/toolkit'

const menuSlicer = createSlice({

	name: 'menuSlice',

	initialState:{

		is_open: false,
		buttons: []
	},

	reducers:{

		toggleMenu : (state, action)=>{

			const {is_open} = state 

			if(!is_open){


				state.is_open = true
				state.buttons = action.payload
				
			}
			else{

				state.is_open = false
				state.buttons = []
			
			}
		}
	}
})

export const {toggleMenu} = menuSlicer.actions

export default menuSlicer.reducer