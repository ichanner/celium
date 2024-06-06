import passport from 'passport'
import {Container} from 'typedi'
import {Strategy} from 'passport-google-oauth20'
import config from "../config/index"
import userService from "../services/user"


export default () =>{

	passport.use(new Strategy({

		clientID: config.CLIENT_ID,
		clientSecret: config.CLIENT_SECRET,
		callbackURL: config.HOSTNAME + "/auth/google/callback",
		scope:['profile'],
		accessType:'offline',
		prompt:'consent'

	}, async (req, accessToken, refreshToken, profile, done)=>{

		try{

			const service = Container.get(userService)
			let user = await service.getUser(profile.id)

			if(!user){

				user = await service.signUp(profile.id, profile.displayName)
			}

			done(null, user)
		}
		catch(err){

			done(err, null)
		}
	}))

	passport.serializeUser((user : any, done : any)=>{

		done(null, user)
	})

	passport.deserializeUser((user : any, done : any)=>{

		done(null, user)
	})
	
}