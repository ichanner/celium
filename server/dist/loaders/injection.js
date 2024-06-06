"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
exports.default = async (connection, agenda, io, models) => {
    for (let model of models) {
        typedi_1.Container.set(model.name, model.model);
    }
    //Container.get('userModel').create({user_id: "123", username: "Ian Channer"})
    typedi_1.Container.set('database', connection);
    typedi_1.Container.set('agenda', agenda);
    typedi_1.Container.set('io', io);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvYWRlcnMvaW5qZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWdDO0FBRWhDLGtCQUFlLEtBQUssRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUV0RCxLQUFJLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBQztRQUV2QixrQkFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUN0QztJQUVELDhFQUE4RTtJQUU5RSxrQkFBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDckMsa0JBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLGtCQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUV4QixDQUFDLENBQUEifQ==