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
exports.PageInfoGuardProvider = exports.PageInfoGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const http_decorator_1 = require("../common/http.decorator");
let PageInfoGuard = class PageInfoGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPageInfo = this.reflector.get(http_decorator_1.PAGE_INFO_FLAG, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const { page, limit } = request.query;
        if (isPageInfo) {
            const newQuery = {
                page: !page ? 1 : Number(page),
                limit: !limit ? 10 : Number(limit),
                skip: 0,
            };
            newQuery.skip = (newQuery.page - 1) * newQuery.limit;
            request.query = Object.assign(Object.assign({}, request.query), newQuery);
        }
        return true;
    }
};
PageInfoGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PageInfoGuard);
exports.PageInfoGuard = PageInfoGuard;
exports.PageInfoGuardProvider = {
    provide: core_1.APP_GUARD,
    useClass: PageInfoGuard,
};
//# sourceMappingURL=pageinfo.guard.js.map