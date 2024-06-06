"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = void 0;
function isValidDate(date) {
    // An invalid date object returns NaN for getTime()
    return date !== null && Number.isNaN(new Date(date).getTime()) === false;
}
exports.isValidDate = isValidDate;
//# sourceMappingURL=isValidDate.js.map