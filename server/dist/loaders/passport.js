"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const typedi_1 = require("typedi");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const index_1 = __importDefault(require("../config/index"));
const user_1 = __importDefault(require("../services/user"));
exports.default = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: index_1.default.CLIENT_ID,
        clientSecret: index_1.default.CLIENT_SECRET,
        callbackURL: index_1.default.HOSTNAME + "/auth/google/callback",
        scope: ['profile'],
        accessType: 'offline',
        prompt: 'consent'
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            const service = typedi_1.Container.get(user_1.default);
            let user = await service.getUser(profile.id);
            if (!user) {
                user = await service.signUp(profile.id, profile.displayName, profile.picture);
            }
            done(null, user);
        }
        catch (err) {
            done(err, null);
        }
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9hZGVycy9wYXNzcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUErQjtBQUMvQixtQ0FBZ0M7QUFDaEMscUVBQWdEO0FBQ2hELDREQUFvQztBQUNwQyw0REFBMEM7QUFHMUMsa0JBQWUsR0FBRyxFQUFFO0lBRW5CLGtCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksa0NBQVEsQ0FBQztRQUV6QixRQUFRLEVBQUUsZUFBTSxDQUFDLFNBQVM7UUFDMUIsWUFBWSxFQUFFLGVBQU0sQ0FBQyxhQUFhO1FBQ2xDLFdBQVcsRUFBRSxlQUFNLENBQUMsUUFBUSxHQUFHLHVCQUF1QjtRQUN0RCxLQUFLLEVBQUMsQ0FBQyxTQUFTLENBQUM7UUFDakIsVUFBVSxFQUFDLFNBQVM7UUFDcEIsTUFBTSxFQUFDLFNBQVM7S0FFaEIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxFQUFFO1FBRXpELElBQUc7WUFFRixNQUFNLE9BQU8sR0FBRyxrQkFBUyxDQUFDLEdBQUcsQ0FBQyxjQUFXLENBQUMsQ0FBQTtZQUMxQyxJQUFJLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRTVDLElBQUcsQ0FBQyxJQUFJLEVBQUM7Z0JBRVIsSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQzdFO1lBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNoQjtRQUNELE9BQU0sR0FBRyxFQUFDO1lBRVQsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNmO0lBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVILGtCQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBVSxFQUFFLElBQVUsRUFBQyxFQUFFO1FBRWhELElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDakIsQ0FBQyxDQUFDLENBQUE7SUFFRixrQkFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQVUsRUFBRSxJQUFVLEVBQUMsRUFBRTtRQUVsRCxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2pCLENBQUMsQ0FBQyxDQUFBO0FBRUgsQ0FBQyxDQUFBIn0=