import express, {Router} from 'express'
import passport from 'passport'
import isAuth from "../middleware/isAuth"

export default (app : Router) =>{

	const router = Router()

	app.use("/auth", router)

	app.get('/google/callback', passport.authenticate('google'))
	app.get('/google', passport.authenticate('google'))
	app.get('/logout', isAuth, (req, res)=>{

		req.logout()
		res.status(200).end()
	})
}