"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Span = new mongoose_1.Schema({
    span_id: { type: String, required: true, index: "text" },
    creation_date: { type: Date, default: Date.now() },
    tags: { type: [String], default: [], index: 'text' },
    is_geo: { type: Boolean, default: false },
    is_branch: { type: Boolean, required: true },
    posts: { type: [Object], default: [] },
    lines: { type: [[Number, Number]], default: [] },
    previewing: { type: [String], default: [] }
});
exports.default = mongoose_1.default.model("Span", Span, "spans");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3Bhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQW1EO0FBSW5ELE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQU0sQ0FBQztJQUV2QixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztJQUN0RCxhQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUM7SUFDaEQsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO0lBQ2xELE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQztJQUN2QyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7SUFDMUMsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQztJQUNwQyxLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUM7SUFDOUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQztDQUN6QyxDQUFDLENBQUE7QUFFRixrQkFBZSxrQkFBUSxDQUFDLEtBQUssQ0FBbUIsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQSJ9