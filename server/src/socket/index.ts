
//@ts-nocheck
/*
import {Socket} from 'socket.io'
import {Container} from 'typedi'
import {createClient} from "redis"
import registerTrailListeners from "./trail"

export default async(socket: Socket) =>{

	const redisClient:ReturnType<typeof createClient> = Container.get('redisClient')

	await redisClient.hSet(socket.user_id, 'socket_id', socket.id)
	await redisClient.hSet(socket.id, 'user_id', socket.user_id)
	
	socket.on('disconnect', ()=>{

		//this.redisClient.del()
	})

	registerTrailListeners(socket)
}
*/