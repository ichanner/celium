import { Router } from 'express';
import passport from 'passport';
import isAuth from "../middleware/isAuth.js";
export default (app) => {
    const router = Router();
    app.use("/auth", router);
    app.get('/google/callback', passport.authenticate('google'));
    app.get('/google', passport.authenticate('google'));
    app.get('/logout', isAuth, (req, res) => {
        req.logout();
        res.status(200).end();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVzL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBZ0IsRUFBQyxNQUFNLEVBQUMsTUFBTSxTQUFTLENBQUE7QUFDdkMsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFBO0FBQy9CLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBRTVDLGVBQWUsQ0FBQyxHQUFZLEVBQUUsRUFBRTtJQUUvQixNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQTtJQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV4QixHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUM1RCxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxFQUFFO1FBRXRDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDdEIsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUEifQ==