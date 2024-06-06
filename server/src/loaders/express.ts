import express from "express"
import passport from 'passport'
import cors from 'cors'
import config from "../config/index"
import routes from "../api/index"
import session from 'express-session'

export default (app : express.Application) =>{

	app.enable('proxy')	
	app.use(session({
		secret: config.SESSION_SECRET, 
		resave: false, 
		saveUninitialized: true
	}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cors())
	app.use(express.urlencoded({extended: true}))
	app.use(express.json())
	app.use(config.API_PREFIX, routes())


	app.use((req, res, next) => {
	  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin (not recommended for production)
	  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	  next();
	});


	app.get('/', (req, res)=>{

		res.send("<b> hello </b>").end()
	})

	app.get('/fun', (req, res)=>{

		res.sendFile('/Users/ianchanner/Downloads/me.js')
	})

	app.get("/status", (req, res)=>{

		res.status(200).send()
	})

	app.head("/status", (req, res)=>{

		res.status(200).send()
	})

	//error 404
	app.use((req, res, next)=>{

		const error = new Error('Not Found')

		error['status'] = 404

		next(error)
	})

	app.use((err, req, res, next)=>{

		if(err.message == "Unauthorized"){

			err['status'] = 403
		}
		else if(err.message == 'Invalid Request'){

			err['status'] = 400
		}
		
		next(err)
	})

	app.use((err, req, res, next)=>{

		res.status(err.status || 500)

		res.json({
			
			message: err.message || "An Error Occured"
		
		}).end()

	})

}