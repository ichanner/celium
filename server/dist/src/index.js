import express from "express";
import { createServer } from "http";
import config from "./config/index.js";
import loaders from './loaders/index.js';
const app = express();
const server = createServer(app);
async function initServer() {
    await loaders(app, server);
    server.listen(config.PORT, () => {
        console.log("Server initialized on port " + config.PORT);
    });
}
initServer();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFBO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUE7QUFDakMsT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUE7QUFDdEMsT0FBTyxPQUFPLE1BQU0sb0JBQW9CLENBQUE7QUFFeEMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUE7QUFDckIsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRWhDLEtBQUssVUFBVSxVQUFVO0lBRXhCLE1BQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUUxQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRSxFQUFFO1FBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQUVELFVBQVUsRUFBRSxDQUFBIn0=