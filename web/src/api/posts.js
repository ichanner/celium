import axios from "./index"
import queryBuilder from "./utils/queryBuilder"
import xhrRequest from "./utils/xhr"
import fileStats from "../utils/fileStats"
import {Attachment} from "../utils/formats"

export const updateLikes = async(post_id, reference_post_id=null)=>{

	try{

		await axios().patch('/user/likes', {

			post_id: post_id,
			reference_post_id: reference_post_id
		})
	}
	catch(err){

		console.log(err)
	}
}

export const deleteResource = async(post_id) =>{

	try{
		
		await axios().delete(`/posts/${post_id}`)
	}
	catch(err){

		console.log(err)
	}
}

export const editResource = async(post_id, new_body, removed_attachments)=>{

	try{

		await axios().patch(`/posts/${post_id}`, {

			new_body: new_body,
			removed_attachments: removed_attachments
		})
	}
	catch(err){

		console.log(err)
	}
}

export const fetchPosts = async(filter_id, filter_field, sort_key, cursor_direction, cursor, sort_direction=-1)=>{

	try{
		
		const end_point = `/posts/${filter_id}/posts`
		const query = queryBuilder(end_point, {
			sort_key, 
			filter_field, 
			cursor_direction, 
			cursor, 
			sort_direction		
		})
		const {data} = await axios().get(query)
		
		return data
	}
	catch(err){

		console.log(err)
	}
}

export const fetchPost = async(post_id)=>{

	try{

		const {data} = await axios().get(`/posts/${post_id}`)

		return data
	}
	catch(err){

		console.log(err)
	}
}

export const bridgeResources = async(from_thread_id, from_post_id, to_thread_id, to_post_id, comment, attachment)=>{

	try{

		const {data} = await axios().post('/posts/bridge', {

			from_thread_id, 
			to_post_id,
			from_post_id,
			to_thread_id,
			comment,
			attachment
		})

		return data
	}
	catch(err){

		console.log(err)
	}
}

export const createResource = async(replier_post_id, body, attachments, topic, uploadCallback, title=null, reference_post_id=null, is_new_trail=false, default_permissions=[])=>{

	try{

		const formData = new FormData()

	    for(let attachment of attachments){

		   const {type, filename} = fileStats(attachment.uri)
		
		   formData.append('files', Attachment(attachment.uri, filename, type))
	    }

	    formData.append('is_new_trail', is_new_trail)
	    formData.append('default_permissions', default_permissions)
		formData.append('topic', topic)
		formData.append('title', title)
		formData.append('body', body)
		formData.append('reference_post_id', reference_post_id)
		formData.append('replied_post_id', replier_post_id)

		const response = await xhrRequest("/posts/create", formData, 'POST', uploadCallback)
		return JSON.parse(response)
	}
	catch(err){

		console.log(err)
	}
}




