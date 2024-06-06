"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProcessEvery = void 0;
const humanInterval = require("human-interval");
function calculateProcessEvery(input = 5000) {
    if (typeof input === 'number')
        return input;
    return humanInterval(input) || 5000;
}
exports.calculateProcessEvery = calculateProcessEvery;
//# sourceMappingURL=processEvery.js.map