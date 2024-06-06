import { Container } from 'typedi';
import spanService from "../services/span.js";
export default (socket) => {
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
        Container.get(spanService).setPreviewing(user_id, span_id, coords);
    };
    socket.on('drop', onDrop);
    socket.on('join', onJoin);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zb2NrZXQvc3Bhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sUUFBUSxDQUFBO0FBQ2hDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFBO0FBRTdDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUV6QixNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBRTFCLE1BQU0sRUFBQyxZQUFZLEVBQUUsV0FBVyxFQUFDLEdBQUcsT0FBTyxDQUFBO1FBRTNDLElBQUcsWUFBWTtZQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN6QixDQUFDLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBRTFCLE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLEdBQUcsT0FBTyxDQUFBO1FBQ2pDLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUVqQyxrRkFBa0Y7UUFDbEYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUVuRSxDQUFDLENBQUE7SUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN0QixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUM3QixDQUFDLENBQUEifQ==