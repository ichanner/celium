"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../config/index"));
const isVideo_1 = __importDefault(require("../utils/isVideo"));
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
    async setPosition(span_id, post_id, coords) {
    }
    async removePost(span_id, post_id, filename) {
        if ((0, isVideo_1.default)(filename)) {
            (0, fs_1.unlinkSync)(path_1.default.join(index_1.default.PREVIEW_DESTINATION, post_id + ".gif"));
        }
        (0, fs_1.unlinkSync)(path_1.default.join(index_1.default.UPLOAD_DESTINATION, filename));
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
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('spanModel')),
    __param(1, (0, typedi_1.Inject)('io')),
    __metadata("design:paramtypes", [Object, Object])
], SpanService);
exports.default = SpanService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9zcGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWlEO0FBQ2pELDJCQUE2QjtBQUU3QixnREFBdUI7QUFDdkIsNERBQW9DO0FBRXBDLCtEQUFzQztBQUl2QixJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFXO0lBR0Q7SUFFUDtJQUh2QixZQUM4QixTQUFTO0lBQ3RDLG1DQUFtQztJQUNiLEVBQUU7UUFGSyxjQUFTLEdBQVQsU0FBUyxDQUFBO1FBRWhCLE9BQUUsR0FBRixFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUVILEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLE1BQXlCO1FBRWhGLE1BQU0sV0FBVyxHQUFHLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUE7UUFFdEQsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FFN0IsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLEVBQ2xCLEVBQUMsS0FBSyxFQUFFLEVBQUMsVUFBVSxFQUFHLFdBQVcsRUFBQyxFQUFDLENBQ25DLENBQUE7SUFDRixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVTtJQUdyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPO1FBRXJCLHVCQUF1QjtJQUN4QixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU07SUFHMUMsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLFFBQWlCO1FBRXJFLElBQUcsSUFBQSxpQkFBTyxFQUFDLFFBQVEsQ0FBQyxFQUFDO1lBRXBCLElBQUEsZUFBVSxFQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQ25FO1FBRUQsSUFBQSxlQUFVLEVBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUUxRDs7Ozs7OztVQU9FO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZ0IsRUFBRSxRQUFpQixFQUFFLE9BQWdCLEVBQUUsTUFBeUIsRUFBRSxTQUFlO1FBQzlHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQTRDRTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsS0FBYyxFQUFFLE9BQWdCO0lBR3ZDLENBQUM7Q0FDRCxDQUFBO0FBekdvQixXQUFXO0lBRC9CLElBQUEsZ0JBQU8sR0FBRTtJQUlQLFdBQUEsSUFBQSxlQUFNLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFFbkIsV0FBQSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQTs7R0FMTSxXQUFXLENBeUcvQjtrQkF6R29CLFdBQVcifQ==