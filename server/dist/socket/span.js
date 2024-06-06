"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const span_1 = __importDefault(require("../services/span"));
exports.default = (socket) => {
    const onJoin = (payload) => {
        const { prev_room_id, new_room_id } = payload;
        if (prev_room_id)
            socket.leave(prev_room_id);
        socket.join(new_room_id);
    };
    const onDrop = (payload) => {
        const { coords, span_id } = payload;
        const { user_id } = socket.req.user;
        //Container.get('io').emit('drop', {coords: coords, user_id: user_id}).to(span_id)
        typedi_1.Container.get(span_1.default).setPreviewing(user_id, span_id, coords);
    };
    socket.on('drop', onDrop);
    socket.on('join', onJoin);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb2NrZXQvc3Bhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUFnQztBQUNoQyw0REFBMEM7QUFFMUMsa0JBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUV6QixNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBRTFCLE1BQU0sRUFBQyxZQUFZLEVBQUUsV0FBVyxFQUFDLEdBQUcsT0FBTyxDQUFBO1FBRTNDLElBQUcsWUFBWTtZQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN6QixDQUFDLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBRTFCLE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLEdBQUcsT0FBTyxDQUFBO1FBQ2pDLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUVqQyxrRkFBa0Y7UUFDbEYsa0JBQVMsQ0FBQyxHQUFHLENBQUMsY0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFbkUsQ0FBQyxDQUFBO0lBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBIn0=