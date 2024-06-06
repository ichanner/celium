import axios from "./index"
import queryBuilder from "./utils/queryBuilder"

export const removeMember = async(removed_user_id, ban_time=null) =>{

	await axios().delete('/members/remove', {removed_user_id, ban_time})
}

export const sendInvite = async(added_user_id) =>{

	await axios().post('/members/invite', {added_user_id})
}

export const updateMemberPermissions = async(updated_user_id, new_permissions) =>{

	await axios().patch('/members/update', {updated_user_id, new_permissions})
}

export const fetchMembers = async(trail_id, cursor) =>{

	const {data} = await axios().get(queryBuilder(`/members/${trail_id}`, {cursor}))

	return data
}