"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgress = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const index_1 = __importDefault(require("../../config/index"));
const uuid_1 = require("uuid");
const typedi_1 = require("typedi");
const storage = multer_1.default.diskStorage({
    destination: index_1.default.UPLOAD_DESTINATION,
    filename: (req, file, done) => {
        const filename = (0, uuid_1.v4)() + "." + file.originalname.split('.')[1];
        req.filename = filename;
        done(null, filename);
    }
});
exports.upload = (0, multer_1.default)({ storage });
const getProgress = (req, res, next) => {
    let progress = 0;
    const size = Number(req.headers['content-length']);
    const io = typedi_1.Container.get('io');
    const { socket_id } = req.body;
    req.on('data', async (data) => {
        progress += data.length;
        //io.emit('fileProgress', Math.round((progress/size)*100)).to(socket_id)
    });
    req.on('end', () => {
        //io.emit('fileUploaded').to(socket_id)
    });
    next();
};
exports.getProgress = getProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9taWRkbGV3YXJlL3VwbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBMkI7QUFDM0IsK0RBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQixtQ0FBZ0M7QUFFaEMsTUFBTSxPQUFPLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUM7SUFFbEMsV0FBVyxFQUFFLGVBQU0sQ0FBQyxrQkFBa0I7SUFFdEMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRTtRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFBLFNBQUksR0FBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMvRCxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDRCxDQUFDLENBQUE7QUFFVyxRQUFBLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0FBRWhDLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUU3QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUE7SUFFaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sRUFBRSxHQUFHLGtCQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzlCLE1BQU0sRUFBQyxTQUFTLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRTVCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUMsRUFBRTtRQUUzQixRQUFRLElBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUVyQix3RUFBd0U7SUFDekUsQ0FBQyxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFFLEVBQUU7UUFFakIsdUNBQXVDO0lBQ3hDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxFQUFFLENBQUE7QUFDUCxDQUFDLENBQUE7QUFyQlksUUFBQSxXQUFXLGVBcUJ2QiJ9