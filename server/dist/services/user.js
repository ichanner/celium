"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
var RELATIONSHIP_ACTIONS;
(function (RELATIONSHIP_ACTIONS) {
    RELATIONSHIP_ACTIONS[RELATIONSHIP_ACTIONS["UNFRIEND"] = 0] = "UNFRIEND";
    RELATIONSHIP_ACTIONS[RELATIONSHIP_ACTIONS["REQUEST"] = 1] = "REQUEST";
    RELATIONSHIP_ACTIONS[RELATIONSHIP_ACTIONS["ACCEPT"] = 2] = "ACCEPT";
    RELATIONSHIP_ACTIONS[RELATIONSHIP_ACTIONS["DENY"] = 3] = "DENY";
})(RELATIONSHIP_ACTIONS || (RELATIONSHIP_ACTIONS = {}));
var RELATIONSHIP_STATES;
(function (RELATIONSHIP_STATES) {
    RELATIONSHIP_STATES[RELATIONSHIP_STATES["PENDING_OUT"] = 0] = "PENDING_OUT";
    RELATIONSHIP_STATES[RELATIONSHIP_STATES["PENDING_IN"] = 1] = "PENDING_IN";
    RELATIONSHIP_STATES[RELATIONSHIP_STATES["FRIENDS"] = 2] = "FRIENDS";
})(RELATIONSHIP_STATES || (RELATIONSHIP_STATES = {}));
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
    async getRelationships(user_id) {
        try {
            const relationships = await this.userModel.aggregate([
                {
                    $match: {
                        user_id: user_id
                    }
                },
                {
                    $project: {
                        _id: 0,
                        friends: {
                            $filter: {
                                input: "$relationships",
                                as: "relationship",
                                cond: { $eq: ["$$relationship.status", RELATIONSHIP_STATES.FRIENDS] }
                            }
                        },
                        pending: {
                            $filter: {
                                input: "$relationships",
                                as: "relationship",
                                cond: {
                                    $or: [
                                        { $eq: ["$$relationship.status", RELATIONSHIP_STATES.PENDING_IN] },
                                        { $eq: ["$$relationship.status", RELATIONSHIP_STATES.PENDING_OUT] }
                                    ]
                                }
                            }
                        }
                    }
                }
            ]);
            return relationships[0];
        }
        catch (err) {
            throw new Error("Unable to retrieve relationships");
        }
    }
    async setRelationship(user_id, other_id, action) {
        let update_query;
        if (action == RELATIONSHIP_ACTIONS.UNFRIEND || action == RELATIONSHIP_ACTIONS.DENY) {
            update_query = [`{ $pull: { relationships: { user_id:{ $in:[user_id, other_id] } } } }`, `{}`];
        }
        else if (action == RELATIONSHIP_ACTIONS.ACCEPT) {
            update_query = [`{

				{
					relationships:{
						
						$push:{	

						    user_id: {

							  	$switch:{

							  	 	branches:[

							  	 		{
							  	 			case: {$eq:["$user_id", user_id]},
							  	 			then: other_id
							  	 		},
							  	 		{
							  	 			case: {$eq:["$user_id", other_id]},
							  	 			then: user_id
							  	 		}
							  	 	]
							  	}
						    },
						 
						    status: action 
						}
					}
				}
			}`, `{}`];
        }
        else if (action == RELATIONSHIP_ACTIONS.REQUEST) {
            update_query = [
                `{	
				   $set: {
				   
				   	 "relationships.$[elem].status": {

				   	 	$cond:[

				   	 		{$eq:["$user_id", user_id]},
				   	 		RELATIONSHIP_STATES.PENDING_IN,
				   	 		RELATIONSHIP_STATES.PENDING_OUT
				   	 	]
				   	 }
				   }
				}`,
                `{arrayFilters:[{"elem.user_id": user_id } ] }`
            ];
        }
        if (update_query) {
            await this.userModel.updateMany({ user_id: { $in: [user_id, other_id] } }, update_query[0], update_query[1]);
        }
    }
    search(query) {
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('io')),
    __param(1, (0, typedi_1.Inject)('userModel')),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.default = UserService;
//`{arrayFilters:[{"elem.user_id": {$in:[user_id, other_id]}}]}`
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEJBQXlCO0FBRXpCLG1DQUFpRDtBQUdqRCxJQUFLLG9CQU1KO0FBTkQsV0FBSyxvQkFBb0I7SUFFeEIsdUVBQVksQ0FBQTtJQUNaLHFFQUFXLENBQUE7SUFDWCxtRUFBVSxDQUFBO0lBQ1YsK0RBQVEsQ0FBQTtBQUNULENBQUMsRUFOSSxvQkFBb0IsS0FBcEIsb0JBQW9CLFFBTXhCO0FBRUQsSUFBSyxtQkFLSjtBQUxELFdBQUssbUJBQW1CO0lBRXZCLDJFQUFlLENBQUE7SUFDZix5RUFBYyxDQUFBO0lBQ2QsbUVBQVcsQ0FBQTtBQUNaLENBQUMsRUFMSSxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBS3ZCO0FBR2MsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQUdSO0lBQ087SUFGOUIsWUFDdUIsRUFBRSxFQUNLLFNBQVM7UUFEaEIsT0FBRSxHQUFGLEVBQUUsQ0FBQTtRQUNLLGNBQVMsR0FBVCxTQUFTLENBQUE7SUFDckMsQ0FBQztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZ0I7UUFFcEMsSUFBRztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQTtZQUU3RCxPQUFPLElBQUksQ0FBQTtTQUNYO1FBQ0QsT0FBTSxHQUFHLEVBQUM7WUFFVCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUE7U0FDMUM7SUFDRixDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLFFBQWlCLEVBQUUsV0FBb0I7UUFFNUUsSUFBRztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JB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