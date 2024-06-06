
//@ts-nocheck
/*
import 'reflect-metadata'
import {PipelineStage} from 'mongoose'
import {ClientSession, MongoClient, ObjectId} from 'mongodb';
import Agenda from 'agenda'
import {v4 as uuid} from 'uuid'
import path from 'path'
import fs from 'fs'
import config from "../config/index"
import IPost from "../interfaces_v2/IPost"
import IAttachment from "../interfaces/IAttachment"
import Post from '../utils/Post'
import BridgedPost from "../utils/BridgedPost"
import {Inject, Service} from 'typedi'
import generateColor from "../utils/generateColor"
import {MAX_POSTS, RELEVANCE_WEIGHT, REPLY_COUNT_WEIGHT, LIKE_COUNT_WEIGHT, BRIDGE_COUNT_WEIGHT} from "../utils/constants"
import {DIRECTIONS, TRAIL_PERMISSIONS} from "../utils/enums"
import TrailService from "./trail"
import UserService from "./user"
import MemberService from "./members"
import ThreadService from "./threads"
import Cursor from "../utils/Cursor"
import {EventDispatcher} from "event-dispatch";
import {PostEvent} from "../subscribers/events"
import {Server} from 'socket.io'
import {createClient} from 'redis'

const {WRITE} = TRAIL_PERMISSIONS
const {TOP, DOWN, AROUND, INITIAL} = DIRECTIONS

@Service()
class PostService{

	constructor(
		@Inject('postsModel') private postsModel : Models.Posts,
		@Inject('client') private client : MongoClient,
		@Inject('topicModel') private topicModel : Models.Topic,
		@Inject('agenda') private agenda: Agenda,
		@Inject('io') private io: Server,
		@Inject('redisClient') private redisClient: ReturnType<typeof createClient>,
		@Inject('eventDispatcher') private eventDispatcher : EventDispatcher,
		private userSevice : UserService,
		private threadService : ThreadService,
		private memberService : MemberService,
		private trailService : TrailService
	){}


	
	private getSort(filter_id : string, filter_field: string, cursor_direction : number, sort_key : string, sort_direction: number){

		let filter = { $match:{ [filter_field]: filter_id } }

		if(cursor_direction != DOWN){

			filter = {

				$match:{

					$expr:{

						$or:[

							{$eq:[`$${filter_field}`, filter_id]}, 
							{$eq:['$inheritor_thread_id', filter_id]}
						]
					}
				}
			}
		}

		return [

			filter,

			{
				$addFields:{

					relevance: {$subtract:[Date.now(), '$creation_date']},
				}
			},

			{
				$addFields:{
					
					'sort_field': {

						$switch:{

							branches:[

								{
									case: {$eq:[sort_key, 'hot']}, then: {

										$add: [ 

											{$multiply: [REPLY_COUNT_WEIGHT,  '$replies']},
											{$multiply: [LIKE_COUNT_WEIGHT,  '$likes']},
											{$multiply: [BRIDGE_COUNT_WEIGHT, '$bridges']},
											{$multiply: [RELEVANCE_WEIGHT,  '$relevance' ]},
										] 
									} 
								},

								{ case: {$eq:[sort_key, 'date']}, then: '$creation_date' },

								{ case: {$eq:[sort_key, 'top']}, then: '$replies'},

							],

							default: '$creation_date'
						}
					}
				}
			},


			//{$sort: {"is_op": sort_direction, "sort_field": sort_direction, "_id": sort_direction}} 	
		]
	}


	private getPostsAround(cursor: string){

		const threshold = MAX_POSTS/2
		const {cursor_id} = Cursor.decode(cursor)

		return[

			{
				$group:{

					_id: null,
					posts: {$push: '$$ROOT'},
				}
			},

			{
				$addFields:{

					cursor_index: {$indexOfArray:['$posts._id', cursor_id]},
				}
			},

			{
				$addFields:{

					has_next: {

						$gt:[
							
							{$subtract:[{$size: '$posts'}, 1]}, 
							{$add:['$cursor_index', threshold]}
						]
					},
					
					has_prev: {$gt:['$cursor_index', threshold]},
				}
			},
			{
				$set:{

					posts: {$slice:['$posts', {$max:[ {$subtract:['$cursor_index', threshold]}, 0]}, MAX_POSTS]}
				}
			},

			{$unwind: '$posts'}
		]
	}
/*
	private getRepliedMeta(){

		return[

			{
				$lookup:{

					from: 'posts',
					
					let:{ replied_post_id: '$posts.replier_post_id'},
					
					pipeline:[

						{
							$match:{

								$expr:{$eq:['$post_id', '$$replied_post_id']}
							}
						},

						{
							$addFields:{

								thread_id: '$inheritor_thread_id',
								has_attachment: {$gt:[{$size: '$attachments'}, 0]}

							}
						},

						{
							$project:{

								body: 1,
								user_id: 1,
								color: 1,
								has_attachment: 1,
								thread_id: 1
							}
						}
					],
					
					as: 'replied_post_meta'
				}
			},

			{
				$addFields:{

					'posts.replied_user_id': {$arrayElemAt: ['$replied_post_meta.user_id', 0]}
				}
			}
		]
	}


	private getBridgedPostMeta(){

		return[

			{
				$lookup:{

					from: 'users',
					
					let: { bridger_user_id: '$posts.user_id' },	
					
					pipeline:[

						{
							$match:{

								$expr:{ $eq:['$id', '$$bridger_user_id'] }
							}
						},

						{
							$project:{

								username: 1
							}
						}
					],
					
					as: 'bridged_user_meta'
				}
			},

			{
				$addFields:{

					bridger_username: {
				        						
						$arrayElemAt:[ '$bridged_user_meta.username', 0 ]
					}
				}
			}		
		]
	}	

	/*
	private mergeReplies(){

		return [


			{
				$graphLookup:{

					from: 'posts',
					startWith: '$posts.inheritor_thread_id',
					connectFromField: 'inheritor_thread_id',
					connectToField: 'thread_id',
					maxDepth:3,
					depthField: "level",
					as: 'repliers'
				}
			},

			{
				$addFields:{

					'posts.repliers': '$repliers'
				}
			}
			
			/*
		
			{ $unwind: '$repliers' },

			{
				$group:{

					_id: '$repliers.thread_id',

					parent: {$first: '$$ROOT' },
					
					repliers: {

						$topN:{

							n: 3,
							sortBy: {replies: -1},
							output: '$repliers', 
						}
					}
				}
			},
		
	
			{ $unset: 'parent.repliers' },

			{
				$replaceWith:{

					posts: {$concatArrays: ['$repliers', ['$parent']]}
				}
			},

			{ $unwind: '$posts' },
			
		
		]
	}


	public retrievePosts(cursor_direction?:number=null, cursor?: string|null=null,sort_direction:number=-1){

		let cursor_query=[]

	    if(cursor_direction == AROUND){

			cursor_query = this.getPostsAround(cursor)
		}
		else if(cursor_direction != null){

			cursor_query = [

				...Cursor.getNextBatch(cursor_direction, cursor, MAX_POSTS), {$unwind: '$posts'}
			]
		}

		return [
			
			...cursor_query,

			//...this.mergeReplies(),

			{
				$facet: {

					normal_posts: [
				        
				        {$match: { "posts.is_bridge": false }}
				    ],
			      	
			      	bridged_posts: [
				        
				        {$match: { "posts.is_bridge": true}},
				       	
				        {
				            $lookup: {
				            
				        		from: "posts",
				              	localField: "posts.bridged_post_id",
				              	foreignField: "post_id", as: "bridged_post"
				            }  
				        },

				        {$unwind: '$bridged_post'},

						...this.getBridgedPostMeta(),

				        {
				        	$set:{

				        		posts: {

				        			$mergeObjects:['$bridged_post',

				        				{
				        					_id: '$_id', 
				        					is_op: false,
				        					thread_id: '$posts.thread_id',
				        					topic: '$posts.topic',
				        					sort_field: '$posts.sort_field',
				        					reference_post_id: '$posts.post_id',
				        					replier_post_id: '$posts.replier_post_id',
				        					bridger_post_content:{

				        						comment: '$posts.body',
				        						user_id: '$posts.user_id',
				        						username: '$bridger_user_name',
				        						creation_date: '$posts.creation_date',
				        					}
				        				}
				        			]
				        		}
				        	}
				        },

						{$unset: 'bridged_post'}
			      	]
			    }
		    },
		  
		    {
		    	$project:{

		    		combinedPosts: {$concatArrays:['$normal_posts', '$bridged_posts']}
		    	}
		    },
 
		    {$unwind: '$combinedPosts'},

		    {
		    	$replaceRoot: {
		    		
		    		newRoot: '$combinedPosts'
		    	}
		    },

		  //  {$sort:{'posts.is_op': sort_direction, 'posts.sort_field': sort_direction, 'posts._id': sort_direction}}   		
		]
	}

	private getGroupStage(){

		return [

	
			{
				$group:{

					_id: null,
					has_next: {$first: '$has_next'},
					has_prev: {$first: '$has_prev'},
					new_posts: {$push: '$posts'}
				}
			},


			/*
			{$unwind: '$new_posts'},
			{$unwind: '$new_posts.repliers'},
			{$sort: {'new_posts.repliers.level': -1} },

			{

				$group:{

					_id: null,
					posts: {$push: '$new_posts'}
				}
			},
			

			{
				$addFields:{

					posts:{

						$reduce:{

							input: '$posts',
							initialValue: {

								currentLevel: -1,
								currentReplies:[],
								previousReplies: []

							},
							in:{

								$let:{

									vars:{

										prev:{

											$cond:{

												if:{$eq:['$$value.currentLevel', '$$this.level']},
												then: '$$value.previousReplies',
												else: '$$value.currentReplies'
											}
										},

										current:{

											$cond:{

												if:{$eq:['$$value.currentLevel', '$$this.level']},
												then: '$$value.currentReplies',
												else: []
											}
										},
									},

									in:{

										currentLevel: '$$this.level',
										previousReplies: '$$prev',
										currentReplies:{

											$concatArrays:[ '$$current',

												[
													{
														$mergeObjects:[ '$$this', 

														    {
																posts: {

																	$filter:{

																		input: '$$prev',
																		as: 'parent',
																		cond:{$eq:['$$parent.thread_id', '$$this.inheritor_thread_id']}
																	}
																}
															}
														]
													}
												]
											]
										}
									}
								}
							}
						}
					}
				},
			},

			{
				$addFields:{

					posts: '$posts.currentReplies'
				}
			}
			
		]	

	}

	public getPostMeta(user_id : string){

		return [

			//...this.getRepliedMeta(),

			{
				$lookup:{

					from: 'users',
					
					let:{ post_id: "$posts.post_id" },
					
					pipeline: [

						{
							$match:{ 

								$expr:{ $eq:['$id', user_id] }  
							}
						},

						{
							$project:{

								is_liked: {$ne:[ {$indexOfArray:['$liked_posts', '$$post_id']}, -1]}
							}
						}

					],
					
					as: 'local_user_meta'
				}
			},

			{$unwind: '$local_user_meta'},

			{
				$lookup:{

					from: 'users',
					
					let:{ 

						creator_user_id: "$posts.user_id", 
						replied_user_id: "$replied_user_id" 
					},
					
					pipeline: [

						{
							$match:{ 

								$expr:{ 

									$or:[

										{$eq:['$id','$$creator_user_id']},
										{$eq:['$id','$$replied_user_id']}
									]

								}  
							},
						},
						{
							$project:{

								id: 1,
								username: 1
							}
						},
					],
					
					as: 'user_meta'
				}
			},

			{
				$addFields:{

					"posts.replied_post_content":{

						$mergeObjects:[

							{$first:'$replied_post_meta'}, {

								username: {

									$arrayElemAt:['$user_meta.username', 

										{$indexOfArray:['$user_meta.id', '$replied_user_id']}
									]
								}

							}
						]
					},

					'posts.username': {

						$arrayElemAt:['$user_meta.username', 

							{$indexOfArray:['$user_meta.id', '$posts.user_id']} 
						]
					},

					"posts.parent_color": {$first: '$replied_post_meta.color'},
					"posts.is_liked": '$local_user_meta.is_liked',
					"posts.total_replies": {$add:[`$posts.replies`, `$posts.bridges`]},
				}
			} 
		]
	}

	public async getPosts(
		filter_id: string, 
		filter_field: string, 
		user_id : string, 
		cursor : string | null,
		sort_key : string, 
		cursor_direction : number, 
		sort_direction: number
	){


		const sort_stage = this.getSort(filter_id, filter_field, cursor_direction, sort_key, sort_direction)
		const retrieval_stage = this.retrievePosts(cursor_direction, cursor, sort_direction)
		const meta_stage = this.getPostMeta(user_id)
		const group_stage = this.getGroupStage()
		const pipeline = [
			
			...sort_stage,
			...retrieval_stage, 
			...meta_stage,
			...group_stage
		]
		const posts_record = await this.postsModel.aggregate(pipeline)

		return posts_record[0]
	}

	public async setPostProcessed(post_id : string, attachment : IAttachment, user_id : string){

		try{

			const {format, id} = attachment
			const ext = format.split('/')[1]
			const temp_path = path.join(config.TEMP_DESTINATION, `${attachment.id}.${ext}`)
			const {socket_id} = await this.redisClient.hGetAll(user_id)

			await this.postsModel.updateOne({post_id: post_id},
			  
			  {$set: {'attachments.$[i].is_processing': false}},
			  
			  {arrayFilters: [{ 'i.id': id }]}
			)

			fs.open(temp_path, 'r', (read_err)=>{

				if(read_err) throw read_err;

				fs.unlink(temp_path, (unlink_err)=>{

					if(unlink_err) throw unlink_err
				})
			})	
			
			this.io.to(socket_id).emit('/posts/attachment_processed', ({attachment_id: id, post_id}))
		}
		catch(err){

			console.error(err)
		}
	}

	public async getPost(post_id : string, user_id?: string, with_meta?: boolean){

		//let post_object = await this.redisClient.hGetAll(`posts:${post_id}`)

		//if(!post_object){

			const meta_stage = with_meta ? this.getPostMeta(user_id) : []

			const post_record = await this.postsModel.aggregate([

				{$match: {post_id: post_id}}, 

				{
					$group:{

						_id: null,
						posts: {$push: '$$ROOT'}
					}
				},

				{$unwind: '$posts'},

				...this.retrievePosts(),  ...meta_stage,
				
				{$replaceRoot:{newRoot:'$posts'}}
			])

			//await this.redisClient.hSet(`posts:${post_id}`, JSON.stringify(post_record[0]))

			return post_record[0]
		//}
		//else{

		//	return post_object
		//}
	}

	public async emitNewPost(new_post: IPost){

		const {user_id, thread_id} = new_post
		const is_authorized = await this.memberService.hasPermission(thread_id, user_id, WRITE)

		if(is_authorized){

			this.io.to(thread_id).emit('/trails/new_post', new_post)

			await this.threadsModel.updateOne({id: thread_id}, {$inc:{replies: 1}})
		}
	}

	public async verifyOwnership(post_id: string, requester_id: string){

		const post_record = await this.getPost(post_id)

		return (post_record?.user_id == requester_id)
	}

	public async addPost(

		replied_post_id : string | null, 
		user_id: string,
		body: string, 
		attachments : [IAttachment] | [], 
		topic: string, 
		title: string | null, 
		reference_post_id : string | null,
		default_permissions: [number] | []
	){


		const {current_trail_id} = await this.redisClient.hGetAll(user_id)
		const {inheritor_thread_id} = await this.getPost(replied_post_id)
	
		let new_post = new Post(inheritor_thread_id, replied_post_id, body, user_id, topic, attachments, false, current_trail_id)
		let new_post_id = new_post.post_id

		if(title.length != 0){

			const new_thread_post = await this.threadService.createBranchThread(new_post, title, default_permissions, current_trail_id)

			new_post = BridgedPost(new_thread_post, inheritor_thread_id)
			new_post_id = new_thread_post.post_id
		}
		
		await this.postsModel.bulkWrite([
			
			{
				insertOne:{document: new_post}
			},
			
			{
				updateMany:{

					filter:{

						post_id:{

							$in:[replied_post_id, reference_post_id]
						}

					},
					
					update:{$inc:{replies: 1}}
				}
			}
		])
		
		const created_post = await this.getPost(new_post_id, user_id, true)

		if(attachments.length > 0){

			this.agenda.now('processAttachments_v2', {

				attachments: attachments, 
				post_id: new_post_id, 
				user_id: user_id
			})
		}
		else if(current_trail_id != null){

			await this.emitNewPost(created_post)
		}

		return created_post
	}

	public async bridgePosts(from_thread_id : string, from_post_id : string, to_thread_id : string, to_post_id : string, user_id : string, comment : string=""){

		const from_post = await this.getPost(from_post_id)
		const to_post = await this.getPost(to_post_id)
		const referenced_to_post = BridgedPost(to_post, from_thread_id, comment)
		const referenced_from_post = BridgedPost(from_post, to_thread_id)

		await this.postsModel.bulkWrite([
			
			{
				insertOne:{document: referenced_to_post},
			},
			{
				insertOne:{document: referenced_from_post},
			},
			{
				updateMany:{

					filter:{
						
						post_id:{
							
							$in:[to_post_id, from_post_id]
						}
					},
					
					update:{$inc:{bridges: 1}}
				}
			}
		])

		return await this.getPost(referenced_to_post.post_id, user_id, true)
	}

	public async updateLikes(post_ids : [string], has_liked : boolean, session : ClientSession){

		const action = has_liked ? -1 : 1

		await this.postsModel.updateOne({post_id: {$in: post_ids}}, {$inc:{'likes': action}}).session(session)
	}

	public async editPost(post_id : string, new_body : string, removed_attachments : [string] | [], editor_id : string){

		const {user_id} = await this.getPost(post_id)

		if(user_id != editor_id){

			throw new Error("Unauthorized")
		}
		else{

			await this.postsModel.updateOne({post_id: post_id}, {

				body: new_body, 
				edit_date: Date.now(),		
				$pull:{attachments:{id: {$in: removed_attachments}}}	 
			})
		}

		if(removed_attachments.length > 0) {

			this.agenda.now('deleteAttachments', {

				attachments: removed_attachments
			})
		}
	}

	public async deletePost(post_id : string, deleter_id : string){

		const {attachments, user_id} = await this.getPost(post_id)
		
		if(user_id == deleter_id){

			const new_post = {

				body: '[Deleted]',
				attachments: [],
				user_id: null,
				edit_date: null
			}

			await this.postsModel.updateOne({post_id: post_id}, new_post)

			if(attachments.length > 0) {

				this.agenda.now('deleteAttachments', {

					attachments: attachments
				})
			}
		}
		else{

			throw new Error("Unauthorized")
		}
	}	
}

export default PostService



	private getGroupStage(){


		return [

			{
				$group:{

					_id: null,
					has_next:{$first: '$has_next'},
					has_prev:{$first: '$has_prev'},
					new_posts:{$push: '$posts'}
				}
			},
						
			{
				$project: { _id: 0 }
			}		
		]
	}
	private getBridgedPostMeta(){

		return[

			
			{
				$lookup:{

					from: 'posts',
					let:{
						replied_post_id: '$bridged_post.replier_post_id',
					},
					pipeline:[

						{
							$match:{

								$expr:{$eq:['$post_id', '$$replied_post_id']}
							}
						},

						{
							$addFields:{

								has_attachment: {$gt:[{$size: '$attachments'}, 0]},
								thread_id: '$inheritor_thread_id',
							}
						},

						{
							$project:{

								body: 1,
								user_id: 1,
								has_attachment: 1,
								thread_id: 1
							}
						}
					],
					
					as: 'replied_post_meta'
				}
			},
			

			{
				$lookup:{

					from: 'users',
					let: {
						
						//replied_user_id: {$arrayElemAt:['$replied_post_meta.user_id', 0]},
						bridger_user_id: '$posts.user_id'
					},
					pipeline:[

						{
							$match:{

								$expr:{

									$or:[

										//{$eq:['$id', '$$replied_user_id']},
										{$eq:['$id', '$$bridger_user_id']}
									]
								}
							}
						},

						{
							$project:{

								id: 1,
								username: 1
							}
						}
					],
					
					as: 'bridged_user_meta'
				}
			},

			{
				$addFields:{

					bridger_username: {
				        						
						$arrayElemAt:[

							'$bridged_user_meta.username', 

							{
								$indexOfArray:['$bridged_user_meta.id', '$posts.user_id']
							}
						]
					},

					
				        					
					replied_username: {
						
						$arrayElemAt:[

							'$bridged_user_meta.username', 

							{
								$indexOfArray:['$bridged_user_meta.id', {$arrayElemAt:['$replied_post_meta.user_id', 0]}]
							}
						]
					}
					
				}
			}		
		]
	}
	*/
