"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitGuardProvider = void 0;
const core_1 = require("@nestjs/core");
const nestjs_rate_limiter_1 = require("nestjs-rate-limiter");
exports.LimitGuardProvider = {
    provide: core_1.APP_GUARD,
    useClass: nestjs_rate_limiter_1.RateLimiterGuard,
};
//# sourceMappingURL=limit.guard.js.map