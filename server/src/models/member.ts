import mongoose, {Schema, Document} from 'mongoose'
import IMember from "../interfaces/IMember"

const Member = new Schema({

	user_id:{type: String, required: true},
	trail_id:{type: String, required: true},
	permissions:{type: [Number], default:[]},
})


export default mongoose.model<IMember & Document>("Member", Member, 'members')