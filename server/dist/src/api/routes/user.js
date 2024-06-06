import { Router } from 'express';
import isAuth from "../middleware/isAuth.js";
export default (app) => {
    const router = Router();
    app.use('/user', router);
    router.get('/:user_id', isAuth, async (req, res) => {
        const { user_id } = req.user;
        const { id } = req.params;
        const is_local = (id == user_id);
        //	const user = await Container.get(userService).getUser(user_id)
        //res.json({user, is_local}).end()
    });
    router.get('/getRelationships/:id', isAuth, async (req, res) => {
        const { id } = req.params;
        const { user_id } = req.user;
        const is_local = (id == user_id);
        //const {pending, friended} = await Container.get(userService).getRelationships(user_id, is_local)
        //	res.json({pending, friended}).end()
    });
    router.get('/relationshipStatus/:id', isAuth, async (req, res) => {
        const { id } = req.params;
        const { user_id } = req.user;
        //		const status = await Container.get(userService).getRelationshipStatus(user_id, id)
        //		res.json({id, status}).end()
    });
    router.put('/setRelationship', isAuth, async (req, res) => {
        const { reciever_id, action } = req.body;
        const { user_id } = req.user;
        //	await Container.get(userService).setRelationshipStatus(user_id, reciever_id, action)
        //	res.status(200).end()
    });
    router.get('/search', isAuth, async (req, res) => {
        const { search_query } = req.query;
        //const users = await Container.get(userService).search(search_query)
        //res.json({users}).end()
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBZ0IsRUFBQyxNQUFNLEVBQW9CLE1BQU0sU0FBUyxDQUFBO0FBRTFELE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBRzVDLGVBQWUsQ0FBQyxHQUFZLEVBQUUsRUFBRTtJQUUvQixNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQTtJQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLEdBQWEsRUFBRSxHQUFjLEVBQUMsRUFBRTtRQUVyRSxNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUMxQixNQUFNLEVBQUMsRUFBRSxFQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtRQUN2QixNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQTtRQUVqQyxpRUFBaUU7UUFFaEUsa0NBQWtDO0lBQ25DLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLEdBQWEsRUFBRSxHQUFjLEVBQUMsRUFBRTtRQUVqRixNQUFNLEVBQUMsRUFBRSxFQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtRQUN2QixNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUMxQixNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQTtRQUVoQyxrR0FBa0c7UUFFbkcsc0NBQXNDO0lBQ3RDLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLEdBQWEsRUFBRSxHQUFjLEVBQUMsRUFBRTtRQUVuRixNQUFNLEVBQUMsRUFBRSxFQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtRQUN2QixNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUU1QixzRkFBc0Y7UUFFdEYsZ0NBQWdDO0lBQy9CLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLEdBQWEsRUFBRSxHQUFjLEVBQUMsRUFBRTtRQUU1RSxNQUFNLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDdEMsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFFM0IsdUZBQXVGO1FBRXZGLHdCQUF3QjtJQUV4QixDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsR0FBYSxFQUFFLEdBQWMsRUFBQyxFQUFFO1FBRW5FLE1BQU0sRUFBQyxZQUFZLEVBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBRWhDLHFFQUFxRTtRQUVyRSx5QkFBeUI7SUFDMUIsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUEifQ==