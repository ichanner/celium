import express, {Router} from 'express'
import registerAuth from "./routes/auth"
import registerUsers from "./routes/user"
import registerPosts from "./routes/posts"
import registerMedia from "./routes/media"

export default () =>{

	const router = Router()

	registerPosts(router)
	registerMedia(router)
	registerAuth(router)
	registerUsers(router)

	return router
}