"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/auth", router);
    app.get('/google/callback', passport_1.default.authenticate('google'));
    app.get('/google', passport_1.default.authenticate('google'));
    app.get('/logout', isAuth_1.default, (req, res) => {
        req.logout();
        res.status(200).end();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcm91dGVzL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsd0RBQStCO0FBQy9CLGtFQUF5QztBQUV6QyxrQkFBZSxDQUFDLEdBQVksRUFBRSxFQUFFO0lBRS9CLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFBO0lBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRXhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsa0JBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUM1RCxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxrQkFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGdCQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDLEVBQUU7UUFFdEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN0QixDQUFDLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9