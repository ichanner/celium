"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const index_1 = __importDefault(require("../config/index"));
const span_1 = __importDefault(require("../socket/span"));
exports.default = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: index_1.default.HOSTNAME,
            methods: ["GET", "POST"],
            credentials: true
        },
        allowEIO3: true
    });
    //	io.use()
    io.on('connection', (socket) => {
        (0, span_1.default)(socket);
    });
    return io;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvYWRlcnMvc29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQWdDO0FBRWhDLDREQUFvQztBQUNwQywwREFBa0Q7QUFFbEQsa0JBQWUsQ0FBQyxNQUFvQixFQUFDLEVBQUU7SUFFdEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxrQkFBTSxDQUFDLE1BQU0sRUFBRTtRQUU3QixJQUFJLEVBQUU7WUFFRixNQUFNLEVBQUUsZUFBTSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztZQUN4QixXQUFXLEVBQUUsSUFBSTtTQUNqQjtRQUVELFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQTtJQUVILFdBQVc7SUFFVixFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBQyxFQUFFO1FBRTdCLElBQUEsY0FBcUIsRUFBQyxNQUFNLENBQUMsQ0FBQTtJQUM5QixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFBIn0=