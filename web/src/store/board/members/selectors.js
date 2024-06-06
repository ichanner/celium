import {createSelector} from "@reduxjs/toolkit"

const local_user_id = '123'
const member_lists = (state) => state.memberSlice.member_lists

export const selectLocalUser = (trail_id) = createSelector(member_lists, (member_lists)=>{

	const users = member_lists[trail_id].users
	const user_index = users.findIndex(({id})=>id==local_user_id)
	
	return users[user_index]
})
export const selectUserById = (user_id, trail_id) => createSelector(member_lists, (member_lists)=>{

	const users = member_lists[trail_id].users
	const user_index = users.findIndex(({id})=>id==user_id)
	
	return users[user_index]
})