"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("./mongoose"));
const agenda_1 = __importDefault(require("./agenda"));
const express_1 = __importDefault(require("./express"));
const injection_1 = __importDefault(require("./injection"));
const socket_1 = __importDefault(require("./socket"));
const index_1 = __importDefault(require("../config/index"));
const jobs_1 = __importDefault(require("./jobs"));
exports.default = async (app, server) => {
    const models = [
        { name: 'spanModel', model: require("../models/span").default },
        { name: 'userModel', model: require("../models/user").default }
    ];
    const connection = await (0, mongoose_1.default)(index_1.default.DB_URI);
    const agenda = (0, agenda_1.default)(connection);
    const io = await (0, socket_1.default)(server);
    await (0, injection_1.default)(connection, agenda, io, models);
    await (0, jobs_1.default)(agenda);
    await (0, express_1.default)(app);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9hZGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLDBEQUFxQztBQUNyQyxzREFBaUM7QUFDakMsd0RBQW1DO0FBQ25DLDREQUF1QztBQUN2QyxzREFBaUM7QUFDakMsNERBQW9DO0FBQ3BDLGtEQUE2QjtBQUk3QixrQkFBZSxLQUFLLEVBQUMsR0FBeUIsRUFBRSxNQUFvQixFQUFDLEVBQUU7SUFFdEUsTUFBTSxNQUFNLEdBQUc7UUFFWixFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sRUFBQztRQUM3RCxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sRUFBQztLQUM3RCxDQUFBO0lBRUgsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLGtCQUFZLEVBQUMsZUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BELE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQTtJQUNyQyxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsZ0JBQVUsRUFBQyxNQUFNLENBQUMsQ0FBQTtJQUNuQyxNQUFNLElBQUEsbUJBQWEsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNuRCxNQUFNLElBQUEsY0FBUSxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RCLE1BQU0sSUFBQSxpQkFBVyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0FBSXZCLENBQUMsQ0FBQSJ9