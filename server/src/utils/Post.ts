import IAttachment from "../interfaces/IAttachment"
import IPost from "../interfaces/IPost"
import generateColor from "./generateColor"
import {v4 as uuid} from "uuid"

class Post implements IPost  {
	id: string;
	parent_id: string;
	author_id: string;
	topic: string;
	color: string;
	attachments: [IAttachment] | [];
	body: string;
	creation_date: number;
	likes: number;
	bridges: number;
	replies: number;
	edit_date: number | null;

	constructor(
		parent_id : string, 
		body : string, 
		author_id : string, 
		topic : string, 
		attachments:[IAttachment] | []
	){


		this.color = generateColor()
		this.id = uuid()
		this.creation_date = Date.now()
		this.parent_id = parent_id
		this.attachments = attachments
		this.author_id = author_id
		this.body = body
		this.edit_date = null
		this.topic = topic
		this.likes = 0
		this.bridges = 0
		this.replies = 0
	}
}

export default Post



