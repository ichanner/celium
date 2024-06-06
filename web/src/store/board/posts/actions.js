import {fetchThread} from "../../../api/threads"
import {setFocusedTrail} from "../trails/actions"
import {fetchFeed} from "../../../api/threads"
import {DEFAULT_KEY, DIRECTIONS} from "../../../utils/constants"
import {setUploadProgress} from "../../create/reducer"
import getFocusedPost from "./utils/getFocusedPost"
import getCursor from "../utils/getCursor"

const {DOWN, TOP, AROUND, INITIAL} = DIRECTIONS







/*
	Initialzes the board 
*/
export const getSection = (parent_id, intial_posts, initial_post_id) => async(dispatch, getState)=>{

	let new_posts = [];

	//if initial_post_id is specified start from that post
	const direction = initial_post_id != null ? AROUND : INITIAL
	const cursor = initial_post_id != null ? btoa(`${initial_post_id}:0`) : null
	
	if(intial_posts.length > 0){

		new_posts = intial_posts;
	}
	else{

		new_posts = await fetchPosts(parent_id, direction, cursor);
	}

	dispatch( addSection({ new_posts, initial_post_id }) )
	
}

export const getReplies = ( parent_id, cursor_id, cursor_value ) => async(dispatch, getState)=>{

	const { postsSlice } = getState();
	const { sections, focused_section_index } = postsSlice;
	const { posts } = sections[focused_section_index];
	const cursor = cursor_id != parent_id ? getCursor(cursor_id, cursor_value) : null;
	const direction = cursor_id != parent_id ? DOWN : INITIAL;
	const new_posts = await fetchPosts(parent_id, direction, cursor)

	dispatch( addReplies({ new_posts, parent_id }) )	
}

export const getPosts = ( direction ) => async(dispatch, getState)=>{

	const { postsSlice } = getState();
	const { sections, focused_section_index } = postsSlice;
	const { posts } = sections[focused_section_index];
	const { _id, sort_field, parent_id } = direction == TOP ? posts[0] : posts[posts.length-1];
	const cursor = getCursor(_id, sort_field);
	const new_posts = await fetchPosts(parent_id, direction, cursor)

	dispatch( addPosts({ direction, new_posts, parent_id }) )	
}

/*

export const createPost = () => async(dispatch, getState)=>{

	const {postsSlice, creatorSlice} = getState()
	const {body, attachments, topic, title, default_permissions} = creatorSlice
	const {focused_section_index, replying, sections} = postsSlice
	const {posts} = sections[focused_section_index]
	const replied_index = posts.findIndex(({post_id})=>post_id==replying.post_id)
	const {post_id, reference_post_id} = posts[replied_index]
	
	const uploadCallback = ({loaded, total})=>{ 

		dispatch(setUploadProgress((loaded/total)*100)) 
	}

	const new_post = await createResource(post_id, body, attachments, topic, uploadCallback, title, reference_post_id, default_permissions)
				
	dispatch(addPost({new_post, replied_post: posts[replied_index]}))
}

*/




export const editPost = ()=> async(dispatch, getState) =>{

	const {postsSlice, creatorSlice} = getState()
	const {body: new_body, attachments: new_attachments} = creatorSlice
	const {post_id, attachments} = getFocusedPost(postsSlice)
	const removed_attachments = attachments.filter(({id})=>!new_attachments.includes(id)).map((({id})=>id))

	await editResource(post_id, new_body, removed_attachments)

	dispatch(updatePostBody({new_body, removed_attachments, post_id}))
} 

export const deletePost = (deleted_post_id) => async(dispatch, getState)=>{

	await deleteResource(deleted_post_id)

	dispatch(removePost(deleted_post_id))
}
