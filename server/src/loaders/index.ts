import express from "express"
import http from "http"
import {Container} from "typedi"
import initMongoose from "./mongoose"
import initExpress from "./express"
import initInjection from "./injection"
import initWebSocket from "./socket"
import config from "../config/index"
import initJobs from "./jobs"
import initRedis from "./redis"
import "./subscribers"

declare function require(string : string)

const Model = (name: string, file:string) =>{

	return {name, model: require(`../models/${file}`).default}
}

export default async(app : express.Application, server : http.Server)=>{

	const models = 	[

		Model('userModel', "user"),
		Model('postsModel', 'post'),
		Model('membersModel', 'member')
	]

	const connection = await initMongoose(config.DB_URI)
	const redisClient = await initRedis()
	const io = await initWebSocket(server, redisClient)
	const {agenda} = await initInjection(connection, io, redisClient, models)

	await initJobs(agenda)
	await initExpress(app)

}