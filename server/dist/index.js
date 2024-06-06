"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const index_1 = __importDefault(require("./config/index"));
const index_2 = __importDefault(require("./loaders/index"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
async function initServer() {
    await (0, index_2.default)(app, server);
    server.listen(index_1.default.PORT, () => {
        console.log("Server initialized on port " + index_1.default.PORT);
    });
}
initServer();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFDN0IsK0JBQWlDO0FBQ2pDLDJEQUFtQztBQUNuQyw0REFBcUM7QUFFckMsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUE7QUFDckIsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRWhDLEtBQUssVUFBVSxVQUFVO0lBRXhCLE1BQU0sSUFBQSxlQUFPLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRTFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLElBQUksRUFBRSxHQUFFLEVBQUU7UUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsR0FBRyxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDekQsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBRUQsVUFBVSxFQUFFLENBQUEifQ==