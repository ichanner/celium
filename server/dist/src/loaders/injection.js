import { Container } from 'typedi';
export default (connection, io, models) => {
    for (let model of models) {
        Container.set(model.name, model.model);
    }
    Container.set("database", connection);
    //Container.set("agenda", agenda)
    Container.set("io", io);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvYWRlcnMvaW5qZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxRQUFRLENBQUE7QUFFaEMsZUFBZSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFFekMsS0FBSSxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUM7UUFFdkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUN0QztJQUVELFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ3JDLGlDQUFpQztJQUNqQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN4QixDQUFDLENBQUEifQ==