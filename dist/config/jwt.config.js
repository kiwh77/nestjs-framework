"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    expire: Number(process.env.JWT_EXPIRE),
    refreshExpire: Number(process.env.JWT_REFRESH_EXPIRE),
}));
//# sourceMappingURL=jwt.config.js.map