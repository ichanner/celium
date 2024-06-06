import multer from 'multer';
import config from "../../config/index.js";
import { v4 as uuid } from "uuid";
import { Container } from 'typedi';
const storage = multer.diskStorage({
    destination: config.UPLOAD_DESTINATION,
    filename: (req, file, done) => {
        const filename = uuid() + "." + file.originalname.split('.')[1];
        req.filename = filename;
        done(null, filename);
    }
});
export const upload = multer({ storage });
export const getProgress = (req, res, next) => {
    let progress = 0;
    const size = Number(req.headers['content-length']);
    const io = Container.get('io');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9taWRkbGV3YXJlL3VwbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxNQUFNLE1BQU0sdUJBQXVCLENBQUE7QUFDMUMsT0FBTyxFQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUE7QUFDL0IsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFFBQVEsQ0FBQTtBQUVoQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBRWxDLFdBQVcsRUFBRSxNQUFNLENBQUMsa0JBQWtCO0lBRXRDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUU7UUFFNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9ELEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDckIsQ0FBQztDQUNELENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0FBRXZDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFFN0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFBO0lBRWhCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtJQUNsRCxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzlCLE1BQU0sRUFBQyxTQUFTLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBRTVCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUMsRUFBRTtRQUUzQixRQUFRLElBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUVyQix3RUFBd0U7SUFDekUsQ0FBQyxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFFLEVBQUU7UUFFakIsdUNBQXVDO0lBQ3hDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxFQUFFLENBQUE7QUFDUCxDQUFDLENBQUEifQ==