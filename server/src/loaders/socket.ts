//@ts-nocheck
import {Server} from 'socket.io'
import http from "http"
import {setupWorker} from "@socket.io/sticky"
import {createAdapter} from "@socket.io/cluster-adapter"
import passport from "passport"
import config from "../config/index"
import registerSocket from "../socket/index"
import { createShardedAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis'

const {SOCKET_HOST, SOCKET_PORT} = config

export default async(server : http.Server, redisClient: ReturnType<typeof createClient>)=>{

	const pubClient = redisClient.duplicate()

	const io = new Server(server, {

		adapter: createShardedAdapter(redisClient, pubClient),

		cors: {

		    origin: `${SOCKET_HOST}:${SOCKET_PORT}`,
		    methods: ["GET", "POST"],
		    credentials: true
	    },
	  
	    allowEIO3: true
	})

	//setupWorker(io)

	const wrapMiddleware = middleware => (socket, next) => middleware(socket.request, {}, next)
	
	/*
	io.adapter(createAdapter())
	io.use(wrapMiddleware(passport.initialize()))
	io.use(wrapMiddleware(passport.session()))
	io.use(wrapMiddleware(passport.authenticate('google')))
	*/

	io.use((socket, next)=>{

		socket.user_id = '123'

		next()
	})

	io.on('error', (err)=>{

		console.error(err)
	})
	
	io.on('connection', (socket)=>{

		console.log(socket)

		//socket.on('test', async(payload)=>{

		//	socket.join('test_room')

		//	redisClient

			//redisClient.hSet('user_id', 'socket_id', '123')
			//redisClient.hSet(socket.id, 'current_room', 'test_room')
			
			//redisClient.rPush(`${socket.id}:test_room:perms`, ['1','2'])
			//redisClient.lRem(`${socket.id}:test_room:perms`, 0, '2')
			//redisClient.del(`${socket.id}:test_room:perms`)
			//redisClient.removeElements(`${socket.id}:test_room:perms`, ['1'])
			
			//const {user_id, current_room} = await redisClient.hGetAll(socket.id)
			///const perms = await redisClient.lRange(`${socket.id}:test_room:perms`, 0, -1)
			
			//console.log(user_id)
			//console.log(current_room)
			//console.log(perms)

		//})

		registerSocket(socket)
	})

	io.listen(SOCKET_PORT)

	return io
}