"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardProvider = exports.Role = exports.CAN_CREATE_ROLE = exports.SUPER_ADMIN = exports.ADMIN = exports.DEVELOPER = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const white_config_1 = require("../config/white.config");
const ROLE_FLAG = Symbol('guard_role');
let AuthGuard = class AuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const url = request.originalUrl;
        if (white_config_1.default.some((rule) => rule.test(url)))
            return true;
        const token = request.header('Authorization');
        if (_.isEmpty(token))
            throw new common_1.UnauthorizedException();
        const chunks = token.split(' ');
        if (chunks.length !== 2 || chunks[0] !== 'Bearer') {
            throw new common_1.HttpException('无效的Token', 401);
        }
        let payload;
        try {
            payload = jwt.verify(chunks[1], process.env.JWT_SECRET, {
                algorithms: ['HS256'],
            });
            if (!payload)
                throw new common_1.HttpException('无效的Token', 401);
        }
        catch (error) {
            throw new common_1.HttpException('无效的Token', 401);
        }
        const roles = this.reflector.get(ROLE_FLAG, context.getHandler());
        if (!_.isEmpty(roles) &&
            (!payload.sr || !payload.sr.some((role) => roles.some((r) => r === role)))) {
            throw new common_1.ForbiddenException();
        }
        request.user = payload;
        return true;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
exports.DEVELOPER = 'developer';
exports.ADMIN = 'admin';
exports.SUPER_ADMIN = 'super_admin';
var CAN_CREATE_ROLE;
(function (CAN_CREATE_ROLE) {
    CAN_CREATE_ROLE["DEVELOPER"] = "developer";
    CAN_CREATE_ROLE["ADMIN"] = "admin";
})(CAN_CREATE_ROLE = exports.CAN_CREATE_ROLE || (exports.CAN_CREATE_ROLE = {}));
const Role = (role) => {
    return (0, common_1.SetMetadata)(ROLE_FLAG, toString.apply(role) === '[object Array]' ? role : [role]);
};
exports.Role = Role;
exports.AuthGuardProvider = {
    provide: core_1.APP_GUARD,
    useClass: AuthGuard,
};
//# sourceMappingURL=auth.guard.js.map