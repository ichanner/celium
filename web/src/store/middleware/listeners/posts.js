import {setPostProcessed, updatePostBody, addRemotePost, removePost} from "../../board/posts/reducer"

export default (socket, store)=>{

	socket.on('/posts/attachment_processed', (data)=>{

		const {attachment_id, post_id} = data 

		store.dispatch(setPostProcessed({attachment_id, post_id}))
	})

	socket.on('/trails/edit_post', (data)=>{

		const {removed_attachments, new_body, post_id} = data

		store.dispatch(updatePostBody({removed_attachments, new_body, post_id}))
	})

	socket.on('/trails/delete_post', (data)=>{
		
		const {post_id} = data

		store.dispatch(removePost(post_id))
	})

	socket.on('/trails/new_post', (data)=>{

		if(data.user_id != '123'){ //test
		
			store.dispatch(addRemotePost(data))
		}
	})	
}