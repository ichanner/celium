import {addMember, removeMember, updateMember} from "../../board/members/reducer"

export default (socket, store)=>{

	socket.on('/trails/user_join', async(data)=>{

		const {trail_id, added_user} = data

		store.dispatch(addMember({trail_id, added_user}))
	})	

	socket.on('/trails/user_removed', (data)=>{

		socket.leave(data.trail_id)		
	})

	socket.on('/trails/user_leave', (data)=>{

		const {removed_user_id, trail_id} = data 

		store.dispatch(removeMember({removed_user_id, trail_id}))
	})

	socket.on('/trails/update_permissions', (data)=>{

		const {updated_fields, updated_user_id, trail_id} = data 

		store.dispatch(updateMember({updated_user_id, updated_fields, trail_id}))
	})	
}