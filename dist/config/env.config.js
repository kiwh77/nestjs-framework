"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('env', () => ({
    isDev: process.env.NODE_ENV === 'developer',
    isProd: process.env.NODE_ENV === 'production',
}));
//# sourceMappingURL=env.config.js.map