import { Router } from 'express';
import path from "path";
import fs from "fs";
import { Container } from 'typedi';
import { upload, getProgress } from "../middleware/upload.js";
import spanService from "../../services/span.js";
import config from "../../config/index.js";
import isVideo from "../../utils/isVideo.js";
import isAuth from "../middleware/isAuth.js";
export default (app) => {
    const router = Router();
    app.use('/span', router);
    router.get("/feed", isAuth, (req, res) => {
    });
    router.get("/posts", isAuth, (req, res) => {
    });
    router.get("/:filename", isAuth, (req, res) => {
        let stream;
        const { filename } = req.params;
        const range = req.headers.range;
        const file_path = path.join(config.UPLOAD_DESTINATION, filename);
        if (!isVideo(filename)) {
            stream = fs.createReadStream(file_path);
        }
        else {
            if (!range) {
                res.status(400).end();
            }
            else {
                const videoSize = fs.statSync(file_path).size;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + (10 ** 6), videoSize - 1);
                const contentLength = end - start + 1;
                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Type': 'video/mp4',
                    'Content-Length': contentLength
                });
                stream = fs.createReadStream(file_path, { start, end });
            }
        }
        if (stream)
            stream.pipe(res);
    });
    router.post("/create", isAuth, getProgress, upload.single('file'), async (req, res) => {
        const { user_id } = req.user;
        const { id, insertion } = req.body;
        //const post_record = await Container.get(spanService).addPost(id, user_id, insertion)
        //res.json(post_record).end()
    });
    router.delete('/delete', isAuth, async (req, res) => {
        const { span_id, post_id, filename } = req.body;
        await Container.get(spanService).removePost(span_id, post_id, filename);
        res.status(200).end();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVzL3NwYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBZ0IsRUFBQyxNQUFNLEVBQW9CLE1BQU0sU0FBUyxDQUFBO0FBQzFELE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQTtBQUN2QixPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDbkIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFFBQVEsQ0FBQTtBQUNoQyxPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxNQUFNLHlCQUF5QixDQUFBO0FBQzNELE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFBO0FBQ2hELE9BQU8sTUFBTSxNQUFNLHVCQUF1QixDQUFBO0FBQzFDLE9BQU8sT0FBTyxNQUFNLHdCQUF3QixDQUFBO0FBQzVDLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBRTVDLGVBQWUsQ0FBQyxHQUFZLEVBQUUsRUFBRTtJQUUvQixNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQTtJQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFhLEVBQUUsR0FBYyxFQUFDLEVBQUU7SUFHN0QsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFhLEVBQUUsR0FBYyxFQUFDLEVBQUU7SUFHOUQsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFhLEVBQUUsR0FBYyxFQUFDLEVBQUU7UUFFakUsSUFBSSxNQUFNLENBQUE7UUFFVixNQUFNLEVBQUMsUUFBUSxFQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0s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