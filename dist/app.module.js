"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./modules/user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const db_service_1 = require("./common/db.service");
const config_1 = require("@nestjs/config");
const env_config_1 = require("./config/env.config");
const pageinfo_guard_1 = require("./guards/pageinfo.guard");
const limit_guard_1 = require("./guards/limit.guard");
const nestjs_rate_limiter_1 = require("nestjs-rate-limiter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
                ignoreEnvFile: false,
                isGlobal: true,
                load: [env_config_1.default],
            }),
            nestjs_rate_limiter_1.RateLimiterModule.register({
                for: 'Express',
                type: 'Memory',
                points: 1,
                pointsConsumed: 1,
                duration: 1,
                errorMessage: '服务器繁忙，请稍候重试！',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: db_service_1.TypeOrmConfigService,
            }),
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, limit_guard_1.LimitGuardProvider, pageinfo_guard_1.PageInfoGuardProvider],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map