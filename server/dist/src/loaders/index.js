import initMongoose from "./mongoose.js";
//import initAgenda from "./agenda.js"
import initExpress from "./express.js";
import initInjection from "./injection.js";
import initSocket from "./socket.js";
import config from "../config/index.js";
import userModel from "../models/user.js";
import spanModel from "../models/span.js";
export default async (app, server) => {
    const models = [
        { name: 'spanModel', model: spanModel },
        { name: 'userModel', model: userModel }
    ];
    const connection = await initMongoose(config.DB_URI);
    //const agenda =  initAgenda(connection)
    //const agenda = new Agenda({mongo: connection})
    const io = await initSocket(server);
    //await initJobs(agenda)
    await initExpress(app);
    await initInjection(connection, io, models);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9hZGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUE7QUFDeEMsc0NBQXNDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMxQyxPQUFPLFVBQVUsTUFBTSxhQUFhLENBQUE7QUFDcEMsT0FBTyxNQUFNLE1BQU0sb0JBQW9CLENBQUE7QUFFdkMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUE7QUFDekMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUE7QUFHekMsZUFBZSxLQUFLLEVBQUMsR0FBeUIsRUFBRSxNQUFvQixFQUFDLEVBQUU7SUFFdEUsTUFBTSxNQUFNLEdBQUc7UUFFWixFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQztRQUNyQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQztLQUNyQyxDQUFBO0lBRUgsTUFBTSxVQUFVLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BELHdDQUF3QztJQUN4QyxnREFBZ0Q7SUFDaEQsTUFBTSxFQUFFLEdBQUcsTUFBTSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbkMsd0JBQXdCO0lBQ3hCLE1BQU0sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3RCLE1BQU0sYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFBIn0=