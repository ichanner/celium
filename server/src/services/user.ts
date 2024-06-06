//@ts-nocheck
import 'reflect-metadata'
import {ClientSession, MongoClient} from 'mongodb';
import mongoose from 'mongoose'
import config from "../config/index"
import {Service, Inject, Container} from "typedi"
import UserModel from "../models/user"
import GroupService from "./group"
import {MAX_RESULTS} from "../utils/constants"
import {IFollow} from "../interfaces/IFollow"
import PostService from "./posts"

const Follow = (follow_id : string, type : number) =>{

	return{

		id: follow_id,
		type: type
	}
}

@Service()
export default class UserService{

	constructor(
		@Inject('client') private client : MongoClient,
		@Inject('userModel') private userModel : Models.User,
	){}

	public async updateTimeline(user_id : string, thread_id : string, post_id : string, session : ClientSession, is_delete:boolean=false){

		let update_query = {}

		if(is_delete){

			update_query = {$pull: {'timeline': {post_id: post_id}  } }
		}
		else{

			update_query = {$push: {'timeline': {post_id: post_id, thread_id: thread_id}}}
		}

		await this.userModel.updateOne({id: user_id}, update_query).session(session)
	}

	public async getFollowing(user_id : string, skip : number){

		const following = await this.userModel.aggregate([

			{$match:{id: user_id}},
			{$unwind: 'following'},
			{$skip: Number(skip)},
			{$limit: MAX_RESULTS}
		])

		return following
	}

	public async updateFollowing(user_id : string, follow_id : string, type : number){

		const session : ClientSession = await this.client.startSession()

		try{

			session.startTransaction()

			const count = await this.userModel.countDocuments({id: user_id, following:{$elemMatch:{id: follow_id}}}).session(session)
			const is_following = count > 0
			const update_query = is_following ? {$pull: {'following.id': follow_id}} : {$push: {'following': Follow(follow_id, type) }}	

			await this.userModel.updateOne({id: user_id}, update_query).session(session)
			await session.commitTransaction()
		}
		catch(e){

			await session.abortTransaction()
		}
		finally{

			session.endSession()
		}
	}

	public async updateLikes(user_id : string, post_id : string){

		const session : ClientSession = await this.client.startSession()

		try{

			session.startTransaction()

			const postService = Container.get(PostService)
			const count = await this.userModel.countDocuments({id: user_id, liked_posts: {$in: post_id}}).session(session)
			const has_liked = count > 0
			const update_query = has_liked ? { $pull:{'liked_posts':  post_id } } : { $push:{'liked_posts': post_id } }

			await this.userModel.updateOne({id: user_id}, update_query).session(session)			
			await session.commitTransaction()
		}
		catch(e){

			await session.abortTransaction()
		}
		finally{

			session.endSession()
		}
	}

	public async getUser(user_id : string){

		try{

			return await this.userModel.findOne({user_id: user_id}).lean()
		}
		catch(err){

			throw new Error("Unable to retrieve user")
		}
	}

	public async signUp(user_id : string, username : string){

		try{

			const user = await this.userModel.create({
				
				user_id: user_id, 
				username: username, 
				creation_date: Date.now()
			})

			return user
		}
		catch(err){

			throw new Error("Unable to create account")
		}
	}

	public async updateProfile(user_id : string, update_body: {username: string}){

		try{

			await this.userModel.updateOne({user_id: user_id}, update_body)
		}
		catch(err){

			throw new Error("Unable to update user")
		}
	}

	public async search(query : string){
				
		const results = await this.userModel.aggregate([

			{
				$search:{

					"index": "username",

					"text":{

						"query": query,
						"path": "username",
						"fuzzy": {}
					}
				}
			},

			{$limit: MAX_RESULTS}
		])
	
		return results;
	}
}



/*

const record = await this.userModel.findOneAndUpdate({id: user_id}, [

				{
					$addFields:{

						has_liked: {

							$gt:[

								{
									$size:{

										$filter:{

											input: '$liked_posts',
											as: 'liked_posts',
											cond:{ $eq:['$$liked_posts.post_id', post_id] }
										}

									}
								},

								0
							]
						}
					}
				},

				{
					$set:{

						liked_posts: {

							$cond:{

								if:{$eq:['$has_liked', true]},

								then:{

									$filter:{

										input: '$liked_posts',
										as: 'post',
										cond:{$ne:['$$post.post_id', post_id]}
									}
								},

								else: {$concatArrays:['$liked_posts', [{thread_id: thread_id, post_id: post_id}]]}
							}
						}
					}
				},

				{$unset: 'has_liked'}
			]

			)

			*/