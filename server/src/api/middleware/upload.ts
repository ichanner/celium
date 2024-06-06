import multer from 'multer'
import config from "../../config/index"
import {v4 as uuid} from "uuid"
import {Container} from 'typedi'
import Attachment from "../../utils/Attachment"

const avatar_storage = multer.diskStorage({

	destination: config.AVATAR_DESTINATION,
	
	filename: (req, file, done)=>{

		const {user_id} = req.user
		const filename = `${user_id}.jpg`
		
		done(null, filename)
	}
})

const media_storage = multer.diskStorage({

	destination: config.TEMP_DESTINATION,

	filename: (req, file, done)=>{

		const {mimetype} = file 
		const id = uuid()
		const ext = mimetype.split('/')[1]
		const filename = `${id}.${ext}`
		const attachment = Attachment(id, mimetype, true)

		if(!req.attachments){

			req.attachments = [attachment]
		}
		else{

			req.attachments.push(attachment)
		}
		
		done(null, filename)
	}
})

export const uploadMedia = multer({storage: media_storage})
export const uploadAvatar = multer({storage: avatar_storage})
