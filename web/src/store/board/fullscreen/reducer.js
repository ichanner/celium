import {createSlice} from '@reduxjs/toolkit'


const fullScreenSlicer = createSlice({

	name: 'fullScreenSlice',

	initialState:{

		attachments: [],
		initial_index: 0,
		download_progress: 0
	},

	reducers:{

		setDownloadProgress: (state, action)=>{

			state.download_progress = action.payload
		},

		toggleFullScreen: (state, action)=>{

			const {attachments} = state

			if(attachments.length == 0){

				const {new_attachments, index} = action.payload

				state.attachments = new_attachments
				state.initial_index = index
			}
			else{

				state.attachments = []
			}
		}
	}
})

export const {toggleFullScreen, setDownloadProgress} = fullScreenSlicer.actions

export default fullScreenSlicer.reducer