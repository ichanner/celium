import { Server } from 'socket.io';
import config from "../config/index.js";
import registerSpanListeners from "../socket/span.js";
export default (server) => {
    const io = new Server(server, {
        cors: {
            origin: config.HOSTNAME,
            methods: ["GET", "POST"],
            credentials: true
        },
        allowEIO3: true
    });
    //	io.use()
    io.on('connection', (socket) => {
        registerSpanListeners(socket);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvYWRlcnMvc29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUE7QUFFaEMsT0FBTyxNQUFNLE1BQU0sb0JBQW9CLENBQUE7QUFDdkMsT0FBTyxxQkFBcUIsTUFBTSxtQkFBbUIsQ0FBQTtBQUVyRCxlQUFlLENBQUMsTUFBb0IsRUFBQyxFQUFFO0lBRXRDLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUU3QixJQUFJLEVBQUU7WUFFRixNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztZQUN4QixXQUFXLEVBQUUsSUFBSTtTQUNqQjtRQUVELFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQTtJQUVILFdBQVc7SUFFVixFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBQyxFQUFFO1FBRTdCLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=