"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
//const __filename= fileURLToPath(import.meta.url)
//const __dirname = dirname(__filename)
const env = dotenv_1.default.config();
if (env.error)
    throw new Error("Unable to load ENV!");
exports.default = {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    API_PREFIX: "/",
    UPLOAD_DESTINATION: path_1.default.join(__dirname, "/../uploads/"),
    PREVIEW_DESTINATION: path_1.default.join(__dirname, "/../previews/"),
    HOSTNAME: "http://localhost:3000",
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTJCO0FBRTNCLGdEQUFxQztBQUVyQyxrREFBa0Q7QUFDbEQsdUNBQXVDO0FBQ3ZDLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFM0IsSUFBRyxHQUFHLENBQUMsS0FBSztJQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUVwRCxrQkFBYztJQUViLE1BQU0sRUFBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQWdCO0lBQ3JDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUk7SUFDdEIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztJQUMxQyxVQUFVLEVBQUUsR0FBRztJQUNmLGtCQUFrQixFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQztJQUN4RCxtQkFBbUIsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUM7SUFDMUQsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTO0lBQ2hDLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWE7Q0FFeEMsQ0FBQSJ9