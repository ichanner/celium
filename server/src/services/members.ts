//@ts-nocheck
/*
import 'reflect-metadata'
import {ClientSession, MongoClient} from 'mongodb'
import {Service, Inject, Container} from 'typedi'
import userService from "./user"
import PostService from "./posts"
import ThreadService from "./threads"
import {v4 as uuid} from 'uuid'
import IPost from "../interfaces_v2/IPost"
import ITrail from "../interfaces/ITrail"
import Cursor from "../utils/Cursor"
import {MAX_POSTS, MAX_RESULTS, MAX_TRAIL_PREVIEWS} from "../utils/constants"
import {TRAIL_PERMISSIONS, DIRECTIONS} from "../utils/enums"
import {Server} from 'socket.io'
import generateColor from "../utils/generateColor"

const {DOWN} = DIRECTIONS
const {ADMIN, READ, WRITE, INVITE} = TRAIL_PERMISSIONS

const Permission = (user_id: string, trail_id: string, permissions: [number]) =>{

	return {user_id, trail_id, permissions}
}

@Service()
export default class MemberService{

	constructor(
		@Inject('membersModel') private membersModel: Models.Members,
		@Inject('client') private client: MongoClient,
		@Inject('redisClient') private redisClient: RedisClient,
		@Inject('io') private io: Server,
		private threadService : ThreadService,
		private postsService : PostService
	){}


	public async getMembers(trail_id: string, user_id: string, cursor: string){

		const is_authorized = await this.hasPermission(trail_id, user_id, READ)

		if(is_authorized){

			const members_record = await this.membersModel.aggregate([

				{$match:{trail_id: trail_id}},

				{
					$addFields:{

						sort_field: {

							$cond: [{$in:[ADMIN, '$permissions']}, 1, 0]
						}
					}
				},

				{$sort:{sort_field: -1, _id: -1}},

				...Cursor.getNextBatch(DOWN, cursor, MAX_RESULTS, 'members'),

				{
					$unwind: '$members'
				},

				{
					$lookup:{

						from: 'users',
						localField: 'members.user_id',
						foreignField: 'id',
						as: 'meta_information'
					}
				},

				{$unwind: '$meta_information'},

				{
					$addFields:{

						'members.username': '$meta_information.username'
					}
				},

				{
					$group:{

						_id: null,
						members: {$push: '$members'},
						count: {$first: '$count'},
						has_next: {$first: '$has_next'}
					}
				}
			])

			return members_record
		}	
		else{

			throw new Error('Unauthorized')
		}
	}

	public async getPermissions(user_id: string, trail_id: string){

		const cached_perms = await this.redisClient.lRange(`${user_id}:${trail_id}:perms`, 0, -1)

		if(cached_perms){

			return cached_perms
		}	
		else{

			const user_record = await this.membersModel.findOne({
				
				user_id: user_id, trail_id: trail_id
			})

			if(user_record){

				return user_record.permissions
			}
		}
	}

	public async removeMember(trail_id: string, removed_user_id: string, remover_user_id: string, banned_time?:number|null=null){

		const is_authorized = await this.hasPermission(trail_id, remover_user_id, ADMIN)
		const is_removing_admin = await this.hasPermission(trail_id, removed_user_id, ADMIN)

		if(is_authorized && !is_removing_admin){

			const {socket_id} = await this.redisClient.hGetAll(removed_user_id)

			await this.redisClient.del(`${removed_user_id}:${trail_id}:perms`)
			await this.redisClient.del(`${removed_user_id}:current_trail_id`)

			if(banned_time){

				const ban_expiration = Date.now()+banned_time
				//TODO
			}
			else{

				await this.membersModel.deleteOne({
					
					trail_id: trail_id, user_id: removed_user_id
				})
			}

			this.io.to(socket_id).emit('/trails/user_removed', {trail_id, banned_time})
		}
		else{

			throw new Error('Unauthorized')
		}		
	}

	public async hasPermission(trail_id: string, user_id: string, permission_type: number){

		const thread = await Container.get(ThreadService).getThread(trail_id) 

		if(thread?.default_permissions.includes(`${permission_type}`)){

			return true
		}

		const cached_perms = await this.redisClient.lRange(`${user_id}:${trail_id}:perms`, 0, -1)	

		if(!cached_perms){

			const user_record = await this.membersModel.findOne({
						
				trail_id: trail_id, 
				user_id: user_id, 
				permissions: {$in: [permission_type, ADMIN]}
			})

			if(user_record){

				await this.cachePermissions(user_id, trail_id, user_record.permissions)

				return true
			}
		}
		else{

			return [permission_type, ADMIN].some(perm => cached_perms.includes(`${perm}`));
		}

		return false
	}

	private async cachePermissions(user_id:string, trail_id: string, permissions:[number]){

		await this.redisClient.rPush(`${user_id}:${trail_id}:perms`, [...permissions.map((perm)=>`${perm}`)])
	}

	public async updateMemberPermissions(trail_id: string, updater_user_id:string, updated_user_id:string, new_permissions:[number]){

		const is_authorized = await this.hasPermission(trail_id, updater_user_id, ADMIN)

		if(is_authorized){

			this.io.to(trail_id).emit('/trails/update_user', {

				updated_user_id: updated_user_id, 
				trail_id: trail_id,
				updated_fields: {permissions: new_permissions} 
			})

			await this.membersModel.updateOne(
				
				{user_id: updated_user_id, trail_id: trail_id}, 
				{permissions: new_permissions},
				{upsert: true}
			)
		}
	}

	public async addMember(trail_id: string, user_id: string, permissions:[number]=[]){
			
		await this.membersModel.create({

			user_id: user_id, 
			trail_id: trail_id, 
			permissions: permissions
		})
	}

	public async sendInvite(trail_id: string, added_user_id: string, adder_user_id: string, override_permissions?:[number]=[]){

		const permission_type = override_permissions.length > 0 ? ADMIN : INVITE
		const is_authorized = await this.hasPermission(trail_id, adder_user_id, permission_type)

		if(is_authorized){	

			const {socket_id} = await this.redisClient.hGetAll(added_user_id)
			const {username: adder_username} = await this.redisClient.hGetAll(adder_user_id)
			const {title, default_permissions} = await Container.get(ThreadService).getThread(trail_id)
			const initial_permissions = override_permissions.length > 0 ? override_permissions : default_permissions
			
			await this.addMember(trail_id, added_user_id, initial_permissions)
			
			this.io.to(socket_id).emit('/trails/invite', {trail_id, title, adder_username})
		}
		else{

			throw new Error('Unauthorized')
		}
	}


}
*/

/*

	public async createTrail(
		new_trail_id: string,
		creator_user_id: string, 
		post_id: string, 
		thread_id: string, 
		default_permissions?:[number]=[READ], 
		title?: string="New Trail", 
		color: string,
		co_creator_user_id?: string | null = null
	){

		//const new_trail = Trail(new_trail_id, title, thread_id, post_id, default_permissions, color)
		//await this.trailModel.create(new_trail)
		
		await this.addUser(new_trail_id, creator_user_id, [ADMIN])
		
		//if(co_creator_user_id){

		//	await this.sendInvite(new_trail_id, co_creator_user_id, creator_user_id, [ADMIN])
	//	}
	}

	public async getTrail(id: string){

		const cached_trail = await this.redisClient.hGetAll(`trails:${id}`)

		if(Object.getPrototypeOf(cached_trail)){

			return JSON.parse(cached_trail)
		}
		else{

			return await this.trailModel.findOne({id: id}) || Trail("", "", "", [], "")
		}
	}

			///await this.redisClient.rPush(`${user_id}:created_posts`, post_id) 

public async verifyOwnership(post_id: string, requester_id: string){

		const created_posts = await this.redisClient.lRange(`${requester_id}:created_posts`, 0, -1) 
		const is_cached = created_posts.includes(post_id)

		if(!is_cached){

			const post_record = await this.postsService.getPost(post_id)

			return (post_record.user_id == requester_id)
		}
		else{

			return true	
		}

		return false
	}
	*/