import {createSlice} from "@reduxjs/toolkit"

const memberSlice = createSlice({

	name: 'memberSlice',

	initialState:{

		member_lists: {}
	},

	reducers:{

		setMembers: (state, action)=>{

			const {member_lists} = state
			const {trail_id, new_users, has_next, count} = action.payload
			const curent_users = member_lists[trail_id].users || []

			state.member_lists[trail_id] = {users: [...curent_users, ...new_users], has_next, count}
		},

		removeMember: (state, action)=>{

			const {member_lists} = state
			const {trail_id, removed_user_id} = action.payload
			const {users, count} = member_lists[trail_id]
			const removed_index = users.findIndex(({user_id})=>user_id==removed_user_id)

			state.member_lists[trail_id] = {...member_lists[trail_id], 

				count: count-1,
				users: [...users.slice(0, removed_index), ...users.slice(removed_index+1)]
			}
		},

		addMember: (state, action)=>{

			const {member_lists} = state
			const {trail_id, added_user} = action.payload
			const {users, count} = member_lists[trail_id]

			state.member_lists[trail_id] = {...member_lists[trail_id],

				count: count+1,
				users: [...users, added_user]
			}
		},

		updateMember: (state, action)=>{

			const {member_lists} = state
			const {trail_id, updated_user_id, updated_fields} = action.payload
			const {users} = member_lists[trail_id]
			
			const updated_user_index = users.findIndex(({user_id})=>user_id==updated_user_id)
			const updated_user = {...users[updated_user_index], updated_fields}

			state.member_lists[trail_id] = {...member_lists[trail_id],

				users: [...users.slice(0, updated_user_index), updated_user, ...users.slice(updated_user_index+1)]
			}
		}
	}

})

export default memberSlice.reducer

export const {setMembers, removeMember, addMember, updateMember} = memberSlice.actions