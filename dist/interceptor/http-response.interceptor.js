"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponseProvider = exports.HttpResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const operators_1 = require("rxjs/operators");
const dayjs = require("dayjs");
let HttpResponseInterceptor = class HttpResponseInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const isPageInfo = request.query.page && request.query.limit;
        return next.handle().pipe((0, operators_1.map)((data) => {
            const result = {
                code: 200,
                msg: '操作成功',
                time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                path: request.originalUrl,
                data,
            };
            if (isPageInfo && Array.isArray(data)) {
                const [list, total] = data;
                result.count = total;
                result.page = Number(request.query.page);
                result.limit = Number(request.query.limit);
                result.data = list;
            }
            return result;
        }));
    }
};
HttpResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], HttpResponseInterceptor);
exports.HttpResponseInterceptor = HttpResponseInterceptor;
exports.HttpResponseProvider = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: HttpResponseInterceptor,
};
//# sourceMappingURL=http-response.interceptor.js.map