"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./routes/auth"));
const span_1 = __importDefault(require("./routes/span"));
const user_1 = __importDefault(require("./routes/user"));
exports.default = () => {
    const router = (0, express_1.Router)();
    (0, auth_1.default)(router);
    (0, user_1.default)(router);
    (0, span_1.default)(router);
    return router;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLHlEQUFnQztBQUNoQyx5REFBZ0M7QUFDaEMseURBQWdDO0FBRWhDLGtCQUFlLEdBQUcsRUFBRTtJQUVuQixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQTtJQUV2QixJQUFBLGNBQUksRUFBQyxNQUFNLENBQUMsQ0FBQTtJQUNaLElBQUEsY0FBSSxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ1osSUFBQSxjQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFFWixPQUFPLE1BQU0sQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9