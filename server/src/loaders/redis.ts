//@ts-nocheck
import {createClient, defineScript} from 'redis'
import config from "../config/index"

const {REDIS_PORT, HOSTNAME} = config

export default async() =>{

	const redisClient: ReturnType<typeof createClient> = createClient({

		scripts:{

			removeElements: defineScript({

				NUMBER_OF_KEYS: 1,
				SCRIPT: `

					local key = KEYS[1]
					local elementsToRemove = ARGV

					for _, element in ipairs(elementsToRemove) do
						redis.call("LREM", key, 0, element)
					end
				`,
				transformArguments(key:string, elementsToRemove:[string]){

					let args = [key]
					args.push(...elementsToRemove)

					return args
				},
				transformReply(reply: any){

					return reply
				}
			})
		}
	}) 
	
	await redisClient.connect()

	redisClient.on('error', (err)=>{

		console.error(err)
	})

	return redisClient
}
