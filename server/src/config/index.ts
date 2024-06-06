import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const env = dotenv.config()

if(env.error){

	throw new Error("Unable to load ENV!")
}

export default{

	DB_URI:  process.env.DB_URI as string,
	PORT: process.env.PORT,
	SOCKET_PORT: 3000,
	REDIS_PORT: 6379,
	SESSION_SECRET: process.env.SESSION_SECRET,
	API_PREFIX: "/",
	AVATAR_DESTINATION: '/Users/ianchanner/Downloads/avatars',
	UPLOAD_DESTINATION: '/Users/ianchanner/Downloads/uploads',
	PREVIEW_DESTINATION: '/Users/ianchanner/Downloads/previews',
	TEMP_DESTINATION: '/Users/ianchanner/Downloads/temp',
	HOSTNAME: "127.0.0.1",
	SOCKET_HOST: '10.156.139.121',
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
}
