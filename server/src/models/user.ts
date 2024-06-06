import mongoose, {Document, Schema} from 'mongoose'
import path from 'path'
import config from "../config/index"
import IUser from "../interfaces/IUser"

const User = new Schema({

	id: {type: String, required: true, index: 'text'},
	username: {type: String, required: true, index: 'text'},
	creation_date: {type: Number, required: true},
	liked_posts: {type: [String], default: []},
	following: {type: [String], default: []}
})

export default mongoose.model<IUser & Document>('User', User)	