import {Router, Request, Response, NextFunction} from 'express'
import isAuth from "../middleware/isAuth"
import mediaValidation from "../middleware/mediaValidation"
import path from "path"
import fs from "fs"
import {uploadMedia} from "../middleware/upload"
import config from "../../config/index"
import {promisify} from 'util'

const openAsync = promisify(fs.open)
const asyncStat = promisify(fs.stat)

export default (app : Router) =>{

	const router = Router()

	app.use('/media', router)

	router.get('/download/:id', mediaValidation, isAuth, async(req : Request, res : Response)=>{

		try{

			let file_path

			const {id} = req.params
			const {format, quality} = req.query
			const [type, ext] = format.split('/')

			if(type == 'video'){

				if(!quality){

					return res.status(400).end()
				}

				file_path = path.join(config.UPLOAD_DESTINATION, `${id}_${quality}.${ext}`)
			}
			else{

				file_path = path.join(config.UPLOAD_DESTINATION, `${id}.${ext}`)
			}

			const descriptor = await openAsync(file_path, 'r')
			const stats = await asyncStat(file_path)
			const file_size = stats.size
			const stream = fs.createReadStream(file_path)

			res.writeHead(206, {

				'Content-Type': format, 
				'Content-Length': file_size
			})

			stream.pipe(res)

			fs.close(descriptor, (err)=>{

				if(err) throw err
			})
			
		}
		catch(e){

			throw Error(e)
		}
		
	})

	router.get('/preview/:id', mediaValidation, isAuth, async(req : Request, res : Response)=>{

		try{

			const {id} = req.params
			const file_path = path.join(config.PREVIEW_DESTINATION, `${id}.jpg`)
			
			fs.open(file_path, 'r', (err, fd)=>{

				if(err){

					return res.status(404).end()
				}
				else{

					const stream = fs.createReadStream(file_path)
					
					res.set('Content-Type', `image/jpg`)
					
					stream.pipe(res)
				}

				fs.close(fd, (err)=>{

					if(err) throw err
				})
			})
		}
		catch(e){

			throw Error(e)
		}
	
	})

	router.get("/:id", mediaValidation, isAuth, async(req : Request, res : Response, next: NextFunction)=>{

		try{

			const {id} = req.params
			const {format, quality} = req.query
			const {range} = req.headers
			const [type, ext] = format.split('/')
			
			if(type == 'image'){

				const image_path = path.join(config.UPLOAD_DESTINATION, `${id}.${ext}`)
				
				fs.open(image_path, 'r', (err, descriptor)=>{

					if(err){

						return res.status(500).end()
					}

					res.set('Content-Type', format)
					
					const image_stream = fs.createReadStream(image_path)
					
					image_stream.pipe(res)

					fs.close(descriptor, (err)=>{

						if(err) throw err
					})
				})
				
			}
			else if(type == 'video'){

				if(!range){

					throw new Error('Invalid request')
				}
				else{

					const video_path = path.join(config.UPLOAD_DESTINATION, `${id}_${quality}.${ext}`)
					const descriptor = await openAsync(video_path, 'r')
					const stats = await asyncStat(video_path)
					const new_range = (range.includes(',') ? range.split(',')[1].trim() : range)
					const file_size = stats.size
					const start = Number(new_range.replace(/\D/g, ""))
					const end = Math.min(start + (10**6), file_size-1)
					const content_length = end - start+1

					res.writeHead(206, {

						'Content-Range': `bytes ${start}-${end}/${file_size}`,
						'Accept-Ranges': 'bytes',
						'Content-Type': format,
						'Content-Length': content_length
					})

					if(start > end){

						throw new Error('Out of range')
					}

					const video_stream = fs.createReadStream(video_path, {start, end})
					
					video_stream.pipe(res)

					fs.close(descriptor, (err)=>{

						if(err) throw err
					})
				}
			}
		}
		catch(err){

			next(err)
		}

	})
}