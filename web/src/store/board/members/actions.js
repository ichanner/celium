import {setMembers, removeMember, addMember, updateMember} from "./reducer"
import {fetchMembers} from "../../../api/members"
import getCursor from "../utils/getCursor"

export const getMembers = (trail_id, load_more=false) => async(dispatch, getState)=>{

	const {member_lists} = getState().userListSlice 
	const current_users = member_lists[trail_id].users
	const user_cursor = current_users[current_users.length-1]
	const cursor = getCursor(load_more, user_cursor)
	const {has_next, count, users: new_users} = await fetchMembers(trail_id, cursor)

	dispatch(setMembers({has_next, count, new_users}))
}	

export {removeMember, addMember, updateMember}