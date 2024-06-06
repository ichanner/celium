"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePriority = void 0;
const priorityMap = {
    lowest: -20,
    low: -10,
    normal: 0,
    high: 10,
    highest: 20
};
/**
 * Internal method to turn priority into a number
 */
function parsePriority(priority) {
    if (typeof priority === 'number') {
        return priority;
    }
    if (typeof priority === 'string' && priorityMap[priority]) {
        return priorityMap[priority];
    }
    return priorityMap.normal;
}
exports.parsePriority = parsePriority;
//# sourceMappingURL=priority.js.map