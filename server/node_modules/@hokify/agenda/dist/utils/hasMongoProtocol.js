"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMongoProtocol = void 0;
const hasMongoProtocol = (url) => /mongodb(?:\+srv)?:\/\/.*/.test(url);
exports.hasMongoProtocol = hasMongoProtocol;
//# sourceMappingURL=hasMongoProtocol.js.map