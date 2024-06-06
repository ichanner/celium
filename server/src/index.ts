import express from "express"
import {createServer} from "http"
import cluster from 'cluster'
import {setupMaster} from "@socket.io/sticky"
import {setupPrimary} from "@socket.io/cluster-adapter"
import os from "os"
import config from "./config/index"
import initLoaders from './loaders/index'
import { MongoClient, ServerApiVersion } from "mongodb"

const app = express()
const server = createServer(app)



initLoaders(app, server).then(()=>{

	server.listen(config.PORT, ()=>{

		console.log("Server initialized on port " + config.PORT)
	})
})



/*
async function initServer(){

	if(cluster.isPrimary){

		const server = createServer(app)

		server.listen(config.PORT, ()=>{

			console.log("Server initialized on port " + config.PORT)
		})

		setupMaster(server, {loadBalancingMethod: 'least-connection'})
		setupPrimary()
		cluster.setupPrimary()

		const numCPUS = os.cpus().length

		for(let i = 0; i < numCPUS; i++){

			cluster.fork()
		}

		cluster.on("exit", async(worker)=>{
		
			console.log("Worker " + worker.process.pid +  " died")
		
			cluster.fork()
		})
	}
	else{

		const server = createServer(app)

		await initLoaders(app, server)
	}
}


initServer()
*/