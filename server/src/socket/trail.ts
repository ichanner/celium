//@ts-nocheck
/*
import {Container} from 'typedi'
import {Server, Socket} from 'socket.io'
import postService from "../services/posts"
import memberService from "../services/members"
import {TRAIL_PERMISSIONS} from "../utils/enums"

const {READ} = TRAIL_PERMISSIONS

export default (socket: Socket) =>{

	const MemberService: memberService = Container.get(memberService)
	const PostService: postService = Container.get(postService)
	const redisClient: RedisClient = Container.get('redisClient')
	const io: Server = Container.get('io')

	const onRequestJoin = async(payload) =>{

		const {user_id} = socket
		const {trail_id} = payload
		const {current_trail_id} = await redisClient.hGetAll(user_id)
		const is_authorized = await MemberService.hasPermission(trail_id, user_id, READ)

		if(is_authorized){

			if(current_trail_id){

				socket.leave(current_trail_id)
			}

			socket.join(trail_id)

			await redisClient.hSet(user_id, 'current_trail_id', trail_id)
		}
	}

	const onEdit = async(payload)=>{

		const {new_body, removed_attachments, post_id} = payload
		const {current_trail_id} = await redisClient.hGetAll(socket.user_id)
		const is_authorized = await PostService.verifyOwnership(post_id, socket.user_id)

		if(is_authorized){

			io.to(current_trail_id).emit('/trail/edit_post', {

				new_body: new_body, 
				post_id: post_id, 
				removed_attachments: removed_attachments

			})
		}
	}

	const onDelete = async(payload)=>{

		const {post_id} = payload
		const {current_trail_id} = await redisClient.hGetAll(socket.user_id)
		const is_authorized = await PostService.verifyOwnership(post_id, socket.user_id)

		if(is_authorized){

			io.to(current_trail_id).emit('/trail/delete_post', {post_id: post_id})
		}
	}

	io.of('/').adapter.on('join-room', async(trail_id, sid)=>{

		const {user_id} = await redisClient.hGetAll(sid)

		const permissions = await MemberService.getPermissions(user_id, trail_id)

		io.to(trail_id).emit('/trails/user_join', {

			added_user: {

				id: user_id, 
				//name: username, 
				permissions: permissions
			}, 

			trail_id: trail_id
		})
		
	})

	io.of('/').adapter.on('leave-room', async(trail_id, sid)=>{

		const {user_id} = await redisClient.hGetAll(sid)

		io.to(trail_id).emit('/trails/user_leave', {

			removed_user_id: user_id, 
			trail_id: trail_id
		})
	}) 

	socket.on('/trails/join_trail', onRequestJoin)
	socket.on('/trails/edit_post', onEdit)
	socket.on('/trails/delete_post', onDelete)
}
*/