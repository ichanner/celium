"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const typedi_1 = require("typedi");
const upload_1 = require("../middleware/upload");
const span_1 = __importDefault(require("../../services/span"));
const index_1 = __importDefault(require("../../config/index"));
const isVideo_1 = __importDefault(require("../../utils/isVideo"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use('/span', router);
    router.get("/feed", isAuth_1.default, (req, res) => {
    });
    router.get("/posts", isAuth_1.default, (req, res) => {
    });
    router.get("/view/:filename", isAuth_1.default, (req, res) => {
        let stream;
        const { filename } = req.params;
        const range = req.headers.range;
        const file_path = path_1.default.join(index_1.default.UPLOAD_DESTINATION, filename);
        if (!(0, isVideo_1.default)(filename)) {
            stream = fs_1.default.createReadStream(file_path);
        }
        else {
            if (!range) {
                res.status(400).end();
            }
            else {
                const videoSize = fs_1.default.statSync(file_path).size;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + (10 ** 6), videoSize - 1);
                const contentLength = end - start + 1;
                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Type': 'video/mp4',
                    'Content-Length': contentLength
                });
                stream = fs_1.default.createReadStream(file_path, { start, end });
            }
        }
        if (stream)
            stream.pipe(res);
    });
    router.post("/create", isAuth_1.default, upload_1.getProgress, upload_1.upload.single('file'), async (req, res) => {
        const { user_id } = req.user;
        const { id, insertion } = req.body;
        //const post_record = await Container.get(spanService).addPost(id, user_id, insertion)
        //res.json(post_record).end()
    });
    router.delete('/delete', isAuth_1.default, async (req, res) => {
        const { span_id, post_id, filename } = req.body;
        await typedi_1.Container.get(span_1.default).removePost(span_id, post_id, filename);
        res.status(200).end();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcm91dGVzL3NwYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBMEQ7QUFDMUQsZ0RBQXVCO0FBQ3ZCLDRDQUFtQjtBQUNuQixtQ0FBZ0M7QUFDaEMsaURBQXdEO0FBQ3hELCtEQUE2QztBQUM3QywrREFBdUM7QUFDdkMsa0VBQXlDO0FBQ3pDLGtFQUF5QztBQUV6QyxrQkFBZSxDQUFDLEdBQVksRUFBRSxFQUFFO0lBRS9CLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFBO0lBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGdCQUFNLEVBQUUsQ0FBQyxHQUFhLEVBQUUsR0FBYyxFQUFDLEVBQUU7SUFHN0QsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxnQkFBTSxFQUFFLENBQUMsR0FBYSxFQUFFLEdBQWMsRUFBQyxFQUFFO0lBRzlELENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBTSxFQUFFLENBQUMsR0FBYSxFQUFFLEdBQWMsRUFBQyxFQUFFO1FBRXRFLElBQUksTUFBTSxDQUFBO1FBRVYsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7UUFDN0IsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7UUFDL0IsTUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFaEUsSUFBRyxDQUFDLElBQUEsaUJBQU8sRUFBQyxRQUFRLENBQUMsRUFBQztZQUVyQixNQUFNLEdBQUcsWUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ3ZDO2FBQ0c7WUFFSCxJQUFHLENBQUMsS0FBSyxFQUFDO2dCQUVULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7YUFDckI7aUJBQ0c7Z0JBRUgsTUFBTSxTQUFTLEdBQUcsWUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUE7Z0JBQzdDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM5QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBRSxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2xELE1BQU0sYUFBYSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUMsQ0FBQyxDQUFBO2dCQUVuQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFFbEIsZUFBZSxFQUFFLFNBQVMsS0FBSyxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUU7b0JBQ3JELGVBQWUsRUFBRSxPQUFPO29CQUN4QixjQUFjLEVBQUUsV0FBVztvQkFDM0IsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDL0IsQ0FBQyxDQUFBO2dCQUVGLE1BQU0sR0FBRyxZQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUE7YUFDckQ7U0FDRDtRQUVELElBQUcsTUFBTTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnQkFBTSxFQUFFLG9CQUFXLEVBQUUsZUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUMsR0FBYSxFQUFFLEdBQWMsRUFBQyxFQUFFO1FBRXhHLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQzFCLE1BQU0sRUFBQyxFQUFFLEVBQUUsU0FBUyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUVoQyxzRkFBc0Y7UUFFdEYsNkJBQTZCO0lBQzlCLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZ0JBQU0sRUFBRSxLQUFLLEVBQUMsR0FBYSxFQUFFLEdBQWMsRUFBQyxFQUFFO1FBRXRFLE1BQU0sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFFN0MsTUFBTSxrQkFBUyxDQUFDLEdBQUcsQ0FBQyxjQUFXLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUV2RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=