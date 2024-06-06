import { Router } from 'express';
import auth from "./routes/auth.js";
import span from "./routes/span.js";
import user from "./routes/user.js";
export default () => {
    const router = Router();
    auth(router);
    user(router);
    span(router);
    return router;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQWdCLEVBQUMsTUFBTSxFQUFDLE1BQU0sU0FBUyxDQUFBO0FBQ3ZDLE9BQU8sSUFBSSxNQUFNLGtCQUFrQixDQUFBO0FBQ25DLE9BQU8sSUFBSSxNQUFNLGtCQUFrQixDQUFBO0FBQ25DLE9BQU8sSUFBSSxNQUFNLGtCQUFrQixDQUFBO0FBRW5DLGVBQWUsR0FBRyxFQUFFO0lBRW5CLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFBO0lBRXZCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUVaLE9BQU8sTUFBTSxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=