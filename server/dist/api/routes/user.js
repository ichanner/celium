"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const user_1 = __importDefault(require("../../services/user"));
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use('/user', router);
    router.get('/profile/:id', isAuth_1.default, async (req, res) => {
        const { id } = req.params;
        const serviceInstance = typedi_1.Container.get(user_1.default);
        const user = await serviceInstance.getUser(id);
        res.json({ user }).end();
    });
    router.get('/relationships', isAuth_1.default, async (req, res) => {
        //const {user_id} = req.user
        const serviceInstance = typedi_1.Container.get(user_1.default);
        const relationships = await serviceInstance.getRelationships("123");
        res.json(relationships).end();
    });
    router.get('/test', isAuth_1.default, async (req, res) => {
        //const {user_id} = req.user 
        //const {reciever_id, action} = req.body
        const serviceInstance = typedi_1.Container.get(user_1.default);
        await serviceInstance.setRelationship("123", "124", 1);
        res.status(200).end();
    });
    router.get('/search', isAuth_1.default, async (req, res) => {
        const { search_query } = req.query;
        //const users = await Container.get(userService).search(search_query)
        //res.json({users}).end()
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcm91dGVzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBMEQ7QUFDMUQsbUNBQWdDO0FBQ2hDLGtFQUF5QztBQUN6QywrREFBNkM7QUFFN0Msa0JBQWUsQ0FBQyxHQUFZLEVBQUUsRUFBRTtJQUUvQixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQTtJQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxnQkFBTSxFQUFFLEtBQUssRUFBQyxHQUFhLEVBQUUsR0FBYyxFQUFDLEVBQUU7UUFFeEUsTUFBTSxFQUFDLEVBQUUsRUFBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7UUFFdkIsTUFBTSxlQUFlLEdBQUcsa0JBQVMsQ0FBQyxHQUFHLENBQUMsY0FBVyxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRTlDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBTSxFQUFFLEtBQUssRUFBQyxHQUFhLEVBQUUsR0FBYyxFQUFDLEVBQUU7UUFFMUUsNEJBQTRCO1FBRTVCLE1BQU0sZUFBZSxHQUFHLGtCQUFTLENBQUMsR0FBRyxDQUFDLGNBQVcsQ0FBQyxDQUFBO1FBQ2xELE1BQU0sYUFBYSxHQUFHLE1BQU0sZUFBZSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRW5FLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDOUIsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxnQkFBTSxFQUFFLEtBQUssRUFBQyxHQUFhLEVBQUUsR0FBYyxFQUFDLEVBQUU7UUFFakUsNkJBQTZCO1FBQzdCLHdDQUF3QztRQUV4QyxNQUFNLGVBQWUsR0FBRyxrQkFBUyxDQUFDLEdBQUcsQ0FBQyxjQUFXLENBQUMsQ0FBQTtRQUVsRCxNQUFNLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRXRCLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQU0sRUFBRSxLQUFLLEVBQUMsR0FBYSxFQUFFLEdBQWMsRUFBQyxFQUFFO1FBRW5FLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBRWhDLHFFQUFxRTtRQUVyRSx5QkFBeUI7SUFDMUIsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUEifQ==