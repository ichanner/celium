import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { v4 as uuid } from 'uuid';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import cors from 'cors';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import ffmpeg from 'fluent-ffmpeg';
import session from 'express-session';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// dependency injection
// agenda tasks
// open cv frame proccesor for colors
// ffmpeg -i b5e8c579-5d65-45f5-87cc-2ba619e77cd0.mp4 -filter:v "scale=-1:320" -pix_fmt rgb24 -to 00:00:05 out.gif
// ffmpeg -i b5e8c579-5d65-45f5-87cc-2ba619e77cd0.mp4  -vframes 1 -filter:v "scale=-1:320" -pix_fmt rgb24 -ss 00:00:01 out.jpg
dotenv.config();
const DESTINATION = __dirname + '/uploads';
const storage = multer.diskStorage({
    destination: DESTINATION,
    filename: (req, file, cb) => {
        const filename = uuid() + "." + file.originalname.split('.')[1];
        req.filename = filename;
        cb(null, filename);
    }
});
const upload = multer({ storage });
const server = createServer(app);
async function initDB() {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const conn = process.env.DB_URI;
    await mongoose.connect(conn, options);
}
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        // transports: ["websocket", "polling"],
        credentials: true
    },
    allowEIO3: true
});
io.on('connection', (socket) => {
    console.log("new connection");
});
function isLoggedIn(req, res, next) {
    if (!req.user)
        res.status(403).end();
    else
        next();
}
function createVideoPreviews() {
    const video_path = path.join(__dirname, '/uploads/b5e8c579-5d65-45f5-87cc-2ba619e77cd0.mp4');
    ffmpeg()
        .input(video_path)
        .videoFilter("scale=-1:320")
        .duration('00:00:05')
        .outputOptions("-pix_fmt rgb24")
        .output(path.join(__dirname, '/uploads/random.gif'))
        .on('error', (err) => console.log(err))
        .run();
    ffmpeg()
        .input(video_path)
        .frames(1)
        .videoFilter('scale=-1:320')
        .seek('00:00:01')
        .output(path.join(__dirname, '/uploads/random.jpg'))
        .run();
}
passport.use(new Strategy({
    clientID: "70860035429-i2403vfggulhum2d46s3h04qe88g7gdo.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ['profile'],
    accessType: 'offline',
    prompt: 'consent'
}, (accessToken, refreshToken, profile, cb) => {
    cb(null, { username: "test" });
}));
passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});
app.use(session({ secret: 'fort4572', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./"));
app.use(cors());
function progress(req, res, next) {
    let progress = 0;
    const size = Number(req.headers['content-length']);
    req.on('data', async (data) => {
        progress += data.length;
        io.emit('fileProgress', Math.round((progress / size) * 100));
    });
    req.on('end', () => {
        console.log("file uploaded");
    });
    next();
}
app.put('/upload', progress, upload.single('file'), async (req, res) => {
    res.end();
});
app.delete('/delete', async (req, res) => {
    fs.unlinkSync(DESTINATION + req.body.filename);
    res.end();
});
app.get('/logout', isLoggedIn, (req, res) => {
    req.logout((err) => {
        res.redirect('/');
    });
});
app.get('/profile', isLoggedIn, (req, res) => {
    res.send(req.user.username).end();
});
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});
app.get('/auth/google', passport.authenticate('google'));
app.get('/content/:filename', async (req, res) => {
    let stream;
    const { is_video } = req.query;
    const { filename } = req.params;
    const ext = is_video ? '.mp4' : '.jpg';
    const range = req.headers.range;
    const file_path = path.join(DESTINATION, filename + ext);
    if (!is_video)
        stream = fs.createReadStream(file_path);
    else {
        if (!range)
            res.status(400).end();
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
app.get('/', (req, res) => {
    res.render("index.html");
});
server.listen(3000, () => {
    createVideoPreviews();
    initDB();
    //container()
    //Container.get('BeanFactory').create()
    console.log("listening on port 3000");
});
// const cap = cv.VideoReader(path.join(__dirname,'/uploads/b5e8c579-5d65-45f5-87cc-2ba619e77cd0.mp4'))
// console.log(cap)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQTBDLE1BQU0sU0FBUyxDQUFBO0FBQ2hFLE9BQU8sUUFBMEIsTUFBTSxVQUFVLENBQUE7QUFDakQsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQ3BDLE9BQU8sSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxFQUFFLElBQUksSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFBO0FBQy9CLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUE7QUFDakMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFdBQVcsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDbkIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQ3ZCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQTtBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUE7QUFDaEQsT0FBTyxNQUFNLE1BQU0sZUFBZSxDQUFBO0FBQ2xDLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFBO0FBS3JDLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFBO0FBQ3JCLE1BQU0sVUFBVSxHQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2hELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUVyQyx1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLHFDQUFxQztBQUVyQyxrSEFBa0g7QUFDbEgsOEhBQThIO0FBRzlILE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQU9mLE1BQU0sV0FB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