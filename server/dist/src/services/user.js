var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Service, Inject } from "typedi";
let UserService = class UserService {
    io;
    userModel;
    constructor(io, userModel) {
        this.io = io;
        this.userModel = userModel;
    }
    async getUser(user_id) {
        try {
            const user = await this.userModel.findOne({ user_id: user_id });
            return user;
        }
        catch (err) {
            throw new Error("Unable to retrieve user");
        }
    }
    async signUp(user_id, username, profile_uri) {
        try {
            const user = await this.userModel.create({
                user_id: user_id,
                username: username,
                profile_uri: profile_uri
            });
            return user;
        }
        catch (err) {
            throw new Error("Unable to create account");
        }
    }
    /*
        async getRelationshipStatus(user_id : string, other_id : string){
            
            const {relationships} = await this.userModel.aggregate([
    
                {
                    $match:{
    
                        user_id: user_id
                    }
                },
    
                {
    
                    $project:{
    
                        relationships:{
    
                            $filter:{
    
                                input: "$relationships",
                                as: "relationship",
                                cond: { $eq: ["$$relationship.user_id", other_id] },
                                limit: 1
                            }
                        }
                    }
                }
            ])
    
            return relationships[0].status
        }
    
        async getRelationships(user_id : string, is_local : boolean){
    
            const {friends, pending} = await this.userModel.aggregate([
    
                {
                    $match:{
    
                        user_id: user_id
                    }
                },
                {
                    $project:{
    
                        friends: {
                                
                            $filter:{
    
                                input: "$relationships",
                                as: "relationship",
                                cond: { $eq: ["$$relationship.status", FRIENDED] },
                                //limit: 100
                            }
                        },
    
                        pending: {
                                
                            $filter:{
    
                                input: "$relationships",
                                as: "relationship",
                                cond: { $eq: ["$$relationship.status", PENDING] },
                                //limit: 100
                            }
                        }
                    }
                }
            ])
    
            if(is_local) return {friends, pending}
            else return {friends}
        }
    
        async setRelationshipStatus(user_id : string, other_id : string, action : number){
    
            if(action == UNFRIENDED){
    
                await this.userModel.updateMany(
    
                    {user_id:{$in:[user_id, other_id]}},
    
                    {
                        $pull: {
                            
                            relationships: {
                                
                                $elemMatch:{
                                
                                    $or:[
    
                                        {user_id: user_id},
                                        {user_id: other_id}
                                    ]
                                }
                            }
                        }
                    }
                )
            }
            else{
    
                /*
    
                {$set:{"relationships.$[element].status": action}},
                {arrayFilters:[{user_ids: }]
    
                await this.userModel.updateMany(
    
                    {user_id:{$in:[user_id, other_id]}},
                    {
                            
                            $cond:[
                                 
                                 {},
                                 {relationships:{$push:
                                    {
                                        user_ids: [users_id, other_id],
                                        status: action
                                    }
                                 }},
                                 {$set: }
                            ]
                        
                    },
                    {}
                )
                
            }
        }
        */
    search(query) {
    }
};
UserService = __decorate([
    Service(),
    __param(0, Inject('io')),
    __param(1, Inject('userModel'))
], UserService);
export default UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLE1BQU0sUUFBUSxDQUFBO0FBSXZCLElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVc7SUFHUjtJQUNPO0lBRjlCLFlBQ3VCLEVBQUUsRUFDSyxTQUF1QjtRQUQ5QixPQUFFLEdBQUYsRUFBRSxDQUFBO1FBQ0ssY0FBUyxHQUFULFNBQVMsQ0FBYztJQUNuRCxDQUFDO0lBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFnQjtRQUU3QixJQUFHO1lBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFBO1lBRTdELE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFDRCxPQUFNLEdBQUcsRUFBQztZQUVULE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtTQUMxQztJQUNGLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWdCLEVBQUUsUUFBaUIsRUFBRSxXQUFvQjtRQUVyRSxJQUFHO1lBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFFeEMsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixXQUFXLEVBQUUsV0FBVzthQUN4QixDQUFDLENBQUE7WUFFRixPQUFPLElBQUksQ0FBQTtTQUNYO1FBQ0QsT0FBTSxHQUFHLEVBQUM7WUFFVCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7U0FDM0M7SUFDRixDQUFDO0lBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUlHO0lBRUYsTUFBTSxDQUFDLEtBQWM7SUFHckIsQ0FBQztDQUNELENBQUE7QUFoTG9CLFdBQVc7SUFEL0IsT0FBTyxFQUFFO0lBSVAsV0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDWixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQUpELFdBQVcsQ0FnTC9CO2VBaExvQixXQUFXIn0=