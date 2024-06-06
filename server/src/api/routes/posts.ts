//@ts-nocheck
import express, {Router, Response, Request, NextFunction} from 'express'
import {Container} from 'typedi'
import {uploadMedia} from "../middleware/upload"
import postsService from "../../services/posts_v2"
import config from "../../config/index"
import isAuth from "../middleware/isAuth"
import parseBoolean from "../../utils/parseBoolean"
import {MAX_ATTACHMENT} from "../../utils/constants"
import {queryParse, bodyParse} from "../middleware/typeCheck"
import validateInput from "../middleware/inputValidations/bodyValidator"
import {createSchema, editSchema} from "../middleware/inputValidations/postSchemas"

export default (app : Router) =>{

	const router = Router()
	const PostsService : postsService = Container.get(postsService)

	app.use('/posts', router)


	router.get('/test', async(req : Request, res : Response) =>{

		const res2 = await PostsService.getPosts('root', '123', 'NjY1N2QyMzcyNWU1ZjQyY2RmNDBlMzlmOjE3MTcwMzE0Nzk2MTE=', 1);

		console.log(res2[1]);
		res.end();
	})

	router.delete('/:post_id', isAuth, async(req : Request, res : Response, next : NextFunction)=>{

		try{

			const { post_id } = req.params;
			const user_id = req.user.id;

			await PostsService.deletePost(post_id, user_id);

			res.end()
		}
		catch(err){

			next(err)
		}
	})

	router.patch('/:post_id', isAuth, async(req : Request, res : Response, next : NextFunction)=>{

		try{

			const { new_body, removed_attachments } = req.body;
			const { post_id } = req.params;
			const user_id = req.user.id;

			await PostsService.editPost(post_id, new_body, removed_attachments, user_id);

			res.end()
		}
		catch(err){

			next(err)
		}
	})


	router.get('/:post_id', isAuth, async(req : Request, res : Response, next : NextFunction)=>{
		
		try{

			const { post_id } = req.params;
			const user_id = req.user.id;
			const post = await PostsService.getPost(post_id, user_id, true)
			
			res.json(post).end();
		}
		catch(err){

			next(err);
		}
	})

	router.get('/:parent_id/posts', queryParse, isAuth, async(req : Request, res : Response, next : NextFunction)=>{

		try{
		
			const { parent_id } = req.params;
			const { cursor, cursor_direction } = req.query;
			const user_id = req.user.id;
			const posts = await PostsService.getPosts(parent_id, user_id, cursor, cursor_direction);
			
			res.json(posts).end();

		}
		catch(err){

			next(err);
		}
	})


	router.post('/create', bodyParse, isAuth, uploadMedia.array('files', MAX_ATTACHMENT), async(req : Request, res : Response, next : NextFunction)=>{

		try{

			const { body, parent_id, topic } = req.body;
			const user_id = req.user.id;
			const attachments = req.attachments || []
			const new_post = await PostsService.addPost(parent_id, user_id, body, attachments, topic);
		
			res.json(new_post).end();
		}
		catch(err){

			next(err)
		}
	})

	router.post('/bridge', isAuth, async(req : Request, res : Response, next : NextFunction)=>{

		try{

			const { incoming_parent_id, incoming_post_id, outgoing_post_id, outgoing_parent_id, comment } = req.body;
			const user_id = req.user.id;
			const bridged_post = await PostsService.bridgePosts(

				incoming_parent_id, 
				incoming_post_id, 
				outgoing_parent_id, 
				outgoing_post_id, 
				user_id, 
				comment
			)

			res.json(bridged_post).end()
		}
		catch(err){

			console.log(err)

			next(err)
		}
	})
}


