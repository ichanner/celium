import {Document, Model} from 'mongoose'
import IGroup from "../../interfaces/IGroup"
import IUser from "../../interfaces/IUser"
import ITopic from "../../interfaces/ITopic"
import ITrail from "../../interfaces/ITrail"
import IPost from "../../interfaces_v2/IPost"
import IThread from "../../interfaces_v2/IThread"
import IMember from "../../interfaces/IMember"
import {createClient} from 'redis'
import {Server} from 'socket.io'
import 

declare global{

	export type RedisClient = ReturnType<typeof createClient>

	namespace Models{

		export type User = Model<IUser & Document>
		export type Topic = Model<ITopic & Document>
		export type Trail = Model<ITrail & Document>
		export type Threads = Model<IThread & Document>
		export type Posts = Model<IPost & Document>
		export type Members = Model<IMember & Document>
	}

		
}