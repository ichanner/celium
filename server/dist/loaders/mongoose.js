"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = async (connection_string) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    const conn = await mongoose_1.default.connect(connection_string, options);
    return conn.connection.db;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9hZGVycy9tb25nb29zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFpRDtBQUdqRCxrQkFBZSxLQUFLLEVBQUMsaUJBQTBCLEVBQUUsRUFBRTtJQUVsRCxNQUFNLE9BQU8sR0FBRztRQUNmLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLGtCQUFrQixFQUFFLElBQUk7S0FDTixDQUFBO0lBRW5CLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFL0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==