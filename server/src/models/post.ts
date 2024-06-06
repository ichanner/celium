import mongoose, {Schema, Document} from 'mongoose'
import IPost from "../interfaces/IPost"

const Attachment = new Schema({

	id: {type: String},
	format: {type: String},
	is_processing: {type: Boolean}
})

const Post = new Schema({

	id: {type: String, required: true, index: 'text'},
	parent_id: {type: String, required: true},
	author_id: {type: String, required: true},
	topic: {type: String, default: null},
	color: {type: String, require: true},
	body: {type: String, default: null},
	creation_date: {type: Number, required: true},
	likes: {type: Number, default: 0},
	bridges: {type: Number, default: 0},
	replies: {type: Number, default: 0},
	edit_date: {type: Number, default: null},
	attachments: {type: [Attachment], default: []},
	leaf_depth: {type: Number, default: 0}, // deepest leaf depth in the tree 
	leaf_date: {type: Number, required: true}, // average of leaf creation dates 
	leaf_expired: {type: Boolean, default: false} // if all leafs are older than 8 minutes


})

export default mongoose.model<IPost & Document>("Post", Post)