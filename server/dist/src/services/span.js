var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Service, Inject } from 'typedi';
import { unlinkSync } from "fs";
import path from "path";
import config from "../config/index.js";
import isVideo from "../utils/isVideo.js";
let SpanService = class SpanService {
    spanModel;
    io;
    constructor(spanModel, 
    //@Inject('agenda') private agenda,
    io) {
        this.spanModel = spanModel;
        this.io = io;
    }
    async setPreviewing(span_id, user_id, coords) {
        const new_preview = { user_id: user_id, coords: coords };
        await this.spanModel.updateOne({ span_id: span_id }, { $push: { previewing: new_preview } });
    }
    async getSpanList(user_id, filter_key) {
    }
    async getPosts(span_id) {
        //return {posts, lines}
    }
    async removePost(span_id, post_id, filename) {
        if (isVideo(filename)) {
            unlinkSync(path.join(config.PREVIEW_DESTINATION, post_id + ".gif"));
        }
        unlinkSync(path.join(config.UPLOAD_DESTINATION, filename));
        /*
        await this.spanModel.updateOne(
            
            {span_id: span_id},
            {$set: {posts.$[elem]:   }},
            {}
        )
        */
    }
    async addPost(span_id, filename, user_id, coords, insertion) {
        /*
        const {at_pointer, at_next, pointer_coords, length} = insertion
        const post_id = filename.split('.')[0]
        const new_coords = getLinePoints(at_pointer, at_next, pointer_coords, length)

        if(span_id == null) span_id = uuid()

        const new_post = {

            id: post_id,
            filename: filename,
            user_id: user_id,
            coords: coords,
            branches: []
        }

        try{

            await this.spanModel.updateOne(
                
                {span_id: span_id},
                {
                    $set:{lines: new_coords},
                    $push:{posts: new_post},
                    $pull:{previewing: {user_id: user_id}}
                },
                {upsert: true}
            )
        }
        catch(err){

            throw new Error('Unable to create post')
        }

        this.io.emit('addPost', {user_id: user_id, insertion: insertion}).to(span_id)
        
        if(isVideo(filename)) {

            this.agenda.now("generatePreviews", {
            
                span_id: span_id,
                post_id: post_id
            })
        }
        */
    }
    search(query, span_id) {
    }
};
SpanService = __decorate([
    Service(),
    __param(0, Inject('spanModel')),
    __param(1, Inject('io'))
], SpanService);
export default SpanService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zcGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQWEsTUFBTSxFQUFDLE1BQU0sUUFBUSxDQUFBO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxJQUFJLENBQUE7QUFFN0IsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLG9CQUFvQixDQUFBO0FBRXZDLE9BQU8sT0FBTyxNQUFNLHFCQUFxQixDQUFBO0FBSTFCLElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVc7SUFHRDtJQUVQO0lBSHZCLFlBQzhCLFNBQVM7SUFDdEMsbUNBQW1DO0lBQ2IsRUFBRTtRQUZLLGNBQVMsR0FBVCxTQUFTLENBQUE7UUFFaEIsT0FBRSxHQUFGLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUgsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFnQixFQUFFLE9BQWdCLEVBQUUsTUFBeUI7UUFFaEYsTUFBTSxXQUFXLEdBQUcsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQTtRQUV0RCxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUU3QixFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsRUFDbEIsRUFBQyxLQUFLLEVBQUUsRUFBQyxVQUFVLEVBQUcsV0FBVyxFQUFDLEVBQUMsQ0FDbkMsQ0FBQTtJQUNGLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVO0lBR3JDLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU87UUFFckIsdUJBQXVCO0lBQ3hCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWdCLEVBQUUsT0FBZ0IsRUFBRSxRQUFpQjtRQUVyRSxJQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBQztZQUVwQixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUE7U0FDbkU7UUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUUxRDs7Ozs7OztVQU9FO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZ0IsRUFBRSxRQUFpQixFQUFFLE9BQWdCLEVBQUUsTUFBeUIsRUFBRSxTQUFlO1FBQzlHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQTRDRTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsS0FBYyxFQUFFLE9BQWdCO0lBR3ZDLENBQUM7Q0FDRCxDQUFBO0FBcEdvQixXQUFXO0lBRC9CLE9BQU8sRUFBRTtJQUlQLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBRW5CLFdBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0dBTE0sV0FBVyxDQW9HL0I7ZUFwR29CLFdBQVcifQ==