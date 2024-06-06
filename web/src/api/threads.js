import axios from './index.js'
import queryBuilder from "./utils/queryBuilder.js"

export const fetchFeed = async(excluded_id = null, cursor=null) =>{

	const query = queryBuilder("/threads/feed", {

		cursor, excluded_id
	})
	const {data} = await axios().get(query)

	return data 
}

export const fetchPreviews = async(post_id, cursor) =>{

	const {data} = await axios().get(queryBuilder(`/threads/${post_id}/previews`, {cursor}))

	return data
}

export const fetchThread = async(filter_id, filter_field)=>{

	const {data} = await axios().get(queryBuilder(`/threads/${filter_id}`, {filter_field}))

	return data
}