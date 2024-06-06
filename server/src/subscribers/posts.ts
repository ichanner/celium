/*
import 'reflect-metadata'
import {EventSubscriber, On} from "event-dispatch";
import events from "./events"
import IPost from "../interfaces_v2/IPost"
import {Inject, Container} from "typedi"

const {createPost, deletePost} = events.PostEvent

@EventSubscriber()
class PostsSubscriber{

	constructor(
		@Inject('threadsModel') private threadsModel, 
		@Inject('io') private io
	){}

	@On(createPost)
	private async onCreatePost(new_post: IPost){

	}	

	@On(deletePost)
	private async onDeletePost(post_id: string){

		
	}
}

export default PostsSubscriber
*/