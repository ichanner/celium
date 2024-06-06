//@ts-nocheck
import mongoose, {ConnectOptions} from 'mongoose'
import {Db} from 'mongodb'
import Post from "../models/post"
import {v4 as uuid} from "uuid"
export default async(connection_string : string) =>{



	const options = { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
	const conn = await mongoose.connect(connection_string, options)


	return conn.connection

}