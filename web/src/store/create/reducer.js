import {createSlice} from '@reduxjs/toolkit'

const creatorSlice = createSlice({

	name: 'creatorSlice',
	
	initialState: {

		attachments: [],
		is_new_trai: false,
		default_permissions: [0],
		body: '',
		title: '',
		topic_name: null,
		upload_progress: 0
	},

	reducers: {

		removeAttachment: (state, action) =>{

			const {attachments} = state 
			const removed_index = action.payload

			state.attachments = [...attachments.slice(0, removed_index), ...attachments.slice(removed_index+1)]
		},

		setTitle: (state, action)=>{

			state.title = action.payload
		},

		setTopic: (state, action) =>{

			const topic_name = action.payload

			state.topic_name = topic_name
		},

		selectAttachment : (state, action) =>{

			const selected = action.payload
			const {attachments} = state 
			const index = attachments.findIndex(({uri})=>uri==selected.uri)

			if(index < 0){

				 state.attachments = [...attachments, selected]
			}
			else{

				state.attachments = [...attachments.slice(0, index), ...attachments.slice(index+1)]
			}
		},

		clearValues: (state, action)=>{

			state.attachments = []
			state.body = ''
			state.title = ''
			state.topic_name = null
			state.upload_progress = 0
		},

		setInitialValues: (state, action) =>{

			const {initial_body, initial_attachments, initial_title} = action.payload

			state.attachments = initial_attachments
			state.body = initial_body
			state.title = initial_title
			state.upload_progress = 0
		},

		setUploadProgress: (state, action)=>{

			state.upload_progress = action.payload
		},

		setBody: (state, action)=>{

			state.body = action.payload
		}
	}
})

export const {removeAttachment, setTitle, setUploadProgress, setTopic, setBody,  selectAttachment, clearValues, setInitialValues} = creatorSlice.actions

export default creatorSlice.reducer