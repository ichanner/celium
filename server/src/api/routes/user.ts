import express, {Router, Response, Request, NextFunction} from 'express'
import {Container} from 'typedi'
import path from "path"
import fs from 'fs'
import {uploadAvatar} from "../middleware/upload"
import isAuth from "../middleware/isAuth"
import userService from "../../services/user"
import config from "../../config/index"
import {bodyParse} from "../middleware/typeCheck"

export default (app : Router) =>{

	const router = Router()
	const UserService = Container.get(userService)

	app.use('/user', router)

	router.patch('/likes', bodyParse, isAuth, async(req : Request, res : Response, next : NextFunction)=>{

		try{

			const user_id = req.user.id;
			const { post_id } = req.body;

			await UserService.updateLikes(user_id, post_id);

			res.end();

		}
		catch(err){

			next(err);
		}
	})
	
	router.patch('/profile', isAuth, uploadAvatar.single('avatar'), async(req : Request, res : Response, next : NextFunction)=>{
		
		try{

			await UserService.updateProfile(req.user.id, req.body);

			res.end()
		}
		catch(err){

			next(err);
		}
	})
	
	router.get('/:id/avatar', isAuth, async(req: Request, res: Response, next: NextFunction)=>{

		const user_id = req.params.id;
		const file_path = path.join(config.AVATAR_DESTINATION, `${user_id}.jpg`)

		try{

			if(!user_id){

				throw new Error('Unable to find avatar');
			}

			fs.open(file_path, 'r', (err, descriptor)=>{

				if(err){

					return res.status(404).end();
				}

				const stream = fs.createReadStream(file_path)
				
				res.set('Content-Type', `image/jpg`)
				
				stream.pipe(res)

				fs.close(descriptor, (err)=>{

					if(err) throw err;
				})
			})
		}
		catch(err){

			next(err)
		}
		
	})
	router.get('/:id', isAuth, async(req: Request, res: Response, next: NextFunction)=>{

		try{

			const user_id = req.params.id;

			if(!user_id){

				throw new Error('Unable to find user');
			}

			const user = await UserService.getUser(user_id)

			res.json({user}).end()
		}
		catch(err){

			next(err);
		}
	})

	router.get('/search', isAuth, async(req : Request, res : Response, next : NextFunction)=>{

		try{

			const { search_query } = req.query;
			const results = await UserService.search(req.query.search_query);

			res.json(results).end();
		}
		catch(err){

			next(err);
		}
	})
}

/*
TODO: move these to their own router

	router.get('/following', isAuth, async(req : Request, res : Response)=>{

		const { user_id, skip } = req.query
		const following_record = await UserService.getFollowing(user_id, skip)

		res.json({following_record}).end()
	})
	
	router.patch('/following', isAuth, async(req : Request, res : Response)=>{})

*/