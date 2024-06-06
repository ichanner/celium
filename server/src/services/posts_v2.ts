//@ts-nocheck
import 'reflect-metadata'
import Agenda from 'agenda'
import { v4 as uuid } from 'uuid'
import config from "../config/index"
import IPost from "../interfaces_v2/IPost"
import IAttachment from "../interfaces/IAttachment"
import Post from '../utils/Post'
import { Inject, Service } from 'typedi'
import generateColor from "../utils/generateColor"
import {MAX_POSTS, RELEVANCE_WEIGHT, REPLY_COUNT_WEIGHT, LIKE_COUNT_WEIGHT, BRIDGE_COUNT_WEIGHT} from "../utils/constants"
import {DIRECTIONS, TRAIL_PERMISSIONS} from "../utils/enums"
import UserService from "./user"
import Cursor from "../utils/Cursor"
import { EventDispatcher } from "event-dispatch";
import { PostEvent } from "../subscribers/events"
import { Server } from 'socket.io'
import { createClient } from 'redis'

const {TOP, DOWN, AROUND, INITIAL} = DIRECTIONS

@Service()
class PostService{

	constructor(
		@Inject('postsModel') private postsModel : Models.Posts,
		@Inject('client') private client : MongoClient,
		@Inject('agenda') private agenda: Agenda,
		@Inject('io') private io: Server,
		@Inject('redisClient') private redisClient: ReturnType<typeof createClient>,
		@Inject('eventDispatcher') private eventDispatcher : EventDispatcher,
		private userSevice : UserService,
	){}


	private traverseDownward(parent_id: string, local_user_id: string){

		return [		

			{ $match: { id: parent_id } },

			{
	            $graphLookup:{
	            
	                from: 'posts',
	                startWith: parent_id,
	                connectFromField: 'id',
	                connectToField: 'parent_id',
	                maxDepth: MAX_POSTS - 1,
	                depthField: 'level',
	                as: 'children'
	            }
	        },
	        
	        {
	            $unwind: '$children'
	        },

//	        ...this.fetchUserInfo(local_user_id, 'children'),

	        { $sort: { 'children.level': 1, 'children.leaf_depth': -1, 'children.leaf_date': 1 } },

	        {

	        	$group:{

	        		_id: null, posts: { $push: '$children' }
	        	}
	        }, 
	       
	        {
	        	$addFields:{

		        	longest_path:{

		        		$reduce:{

		        			input: '$posts',

		        			initialValue: [],

		        			in:{

		        				$cond: {

		        					if: { 

		        						$or:[

		        							{ $eq: [ { $size: '$$value' }, 0 ] }, //first group, initialValue is []
		        							{ $eq: [ { $arrayElemAt: ['$$value.id', -1] }, '$$this.parent_id' ] }
		        						]
		        					},

		        					then: { $concatArrays:[ '$$value', ['$$this'] ] },

		        					else: {

			        					$cond:{


					        				if: { 


					        					$eq: [ { $arrayElemAt: ['$$value.parent_id', -1] }, '$$this.parent_id' ] 


					        				}, //they are siblings 
					        				
					        				then: {

					        					 $concatArrays: [ 

					        					 	 { $slice: ['$$value', {$abs: { $subtract: [{ $size: "$$value" }, 1] } } ] }, 

						        					 [{
						        					 	$mergeObjects:[ 

						        					 		{ $arrayElemAt:['$$value', -1] },

						        					 		{ 
						        					 			siblings: { 

						        					 				$concatArrays: [  

						        					 					{
						        					 						$ifNull: [
		                                                                    
		                                                                    	{
		                                                                    		$let:{

		                                                                    			vars: {
		                                                                    			
		                                                                    				prev: { $arrayElemAt:['$$value', -1] }
		                                                                    			},

		                                                                    			in: { $arrayElemAt:['$$prev.siblings', -1] }		
		                                                                    		}
		                                                                    	},	
		                                                                    
		                                                                    	[] 
		                                                                    ]
		                                                            	},
						        					 				
						        					 					['$$this'] 
						        					 				] 
						        					 			} 
						        					 		}
						        					 	]
						        					}] 
					        					 ]
					        				},
					        				
					        				else: '$$value'
				        				}
			        				}
		        				}
		        			}
		        		}
		        	}
		        }
	        },

	        {$unwind: '$longest_path'},

	        {
	        	$replaceRoot: {

	        		newRoot: '$longest_path'
	        	}
	        }		   
		]		
	}	

	private traverseUpward(parent_id: string, local_user_id: string){
	    
	    return[
	        
	        {
	            $graphLookup:{
	            
	                from: 'posts',
	                startWith: parent_id,
	                connectFromField: 'parent_id',
	                connectToField: 'id',
	                maxDepth: MAX_POSTS - 1,
	                depthField: 'level',
	                as: 'ancestry'
	            }
	        },
	       
	        {
	            $unwind: '$ancestry'
	        },
	       	
	        ...this.fetchUserInfo(local_user_id, 'ancestry'),
	        

	        //find siblings for each ancestor node:

	        {

	        	$lookup:{

	        		from: 'posts',

	        		let: { ancestor_parent_id: '$ancestry.parent_id', ancestor_id: '$ancestry.id' },

	        		pipeline: [

	        			{
	        				$match:{

	        					$expr:{

	        						$and:[

	        							{ $eq: ['$parent_id', '$$ancestor_parent_id' ] },

	        							{ $ne: ['$id', '$$ancestor_id' ] }
	        						]
	        					}
	        				}
	        			}
	        		],

	        		as: 'siblings'
	        	}
	        },

	        //Sort siblings
	        //Limit siblings 
	        //Fetch user info for siblings 



	        /*
	        {
	            $lookup:{
	             
	                from: 'posts',

	                let:{ parent_id: '$ancestry.parent_id', post_id: '$ancestry.id' },

	                pipeline:[

		                {	

		                	$match:{

		                		$expr:{

		                			$and:[

		                				{$eq: ['$$parent_id', '$parent_id']},
		                				{$ne: ['$$post_id', '$id']}
		                			]
		                		}

		                	}
		                },

		                {

		                	$group:{

		                		_id: null,
		                		total: {$sum: 1},
		                		docs: {$push: '$$ROOT'}
		                	}
		                },

		                { $unwind: '$docs' },

		                {
		                	$replaceRoot: { newRoot: '$docs'}
		                },

					    { 
							$sort: { 
						    	
						    	'leaf_expired': 1,  // Assuming `false` (not expired) should come first
						    	'leaf_depth': -1,
						    	'leaf_date': -1
							}
						},

						{ $limit: MAX_POSTS + 1 }
	                ],
	           
	                as: 'siblings'
	            }
	        },

	        { $unwind: '$siblings' },
	       
			...this.fetchUserInfo(local_user_id, 'siblings'),

			{
				$group:{

					_id: '$ancestry.parent_id',
					ancestry: { $first: '$ancestry' },
					siblings: { $push: '$siblings' },
					total_siblings: {$first: '$siblings.total'}
				}
			},

			{
				$addFields:{

					'ancestry.siblings': { $slice: [ '$siblings', 0, MAX_POSTS ] },
					'ancestry.has_next': { $gt: ['$total_siblings', MAX_POSTS] }
				}
			},

			{ $replaceRoot: { newRoot: '$ancestry' } }
	        */
	    ]
	}

	private fetchUserInfo(local_user_id: string, field: string) {

		return [

			//fetches local user info
			{
				$lookup: {

					from: 'users',
					
					let: { post_id: `$${field}.id` },
					
					pipeline: [

						{
							$match:{ 

								$expr:{ $eq:['$id', local_user_id] }  
							}
						},

						{
							$project:{

								is_liked: { $in: ['$$post_id', '$liked_posts'] }
							}
						}

					],
					
					as: 'local_user_info'
				}
			},

			//fetches author info
			{
				$lookup: {

					from: 'users',
					
					let:{ 

						author_id: `$${field}.author_id`
					},
					
					pipeline: [

						{
							$match:{ 

								$expr:{ $eq:['$id','$$author_id']  }  
							},
						},

						{
							$project:{

								username: 1
							}
						},
					],
					
					as: 'author_info'
				}
			},

			{

				$addFields:{


					[`$${field}.username`]: { $arrayElemAt: ['$author_info.username', 0] },
					[`$${field}.is_liked`]: { $arrayElemAt: ['$local_user_info.is_liked', 0] }
				}
			}
		]
	}

	public async getPosts(parent_id: string, user_id: string, cursor: string, cursor_direction: number){

		if(cursor_direction == TOP){

			return await this.postsModel.aggregate([

				...this.traverseUpward(parent_id, user_id)
			])

		}
		else if(cursor_direction == DOWN){

			return await this.postsModel.aggregate([

				...this.traverseDownward(parent_id, cursor, user_id)
			])
		}
		else if(cursor_direction == AROUND){

			const upwardPosts = await this.postsModel.aggregate([

				...this.traverseUpward(parent_id, user_id),
			])

			const downwardPosts = await this.postsModel.aggregate([

				...this.traverseDownward(parent_id, cursor, user_id)
			])

			return [...upwardPosts, ...downwardPosts];
		}
	}


	public async editPost(){}

	public async deletePost(){}

	public async createPost(){}


}


export default PostService
