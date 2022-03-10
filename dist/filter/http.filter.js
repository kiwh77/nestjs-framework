"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFilter = void 0;
const common_1 = require("@nestjs/common");
const dayjs = require("dayjs");
const log4js_1 = require("../utils/log4js");
let HttpFilter = class HttpFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const code = exception.getStatus();
        const logFormat = `
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  URL: ${request.originalUrl}
  Method: ${request.method}
  IP: ${request.ip}
  Status: ${code}
  Response: ${exception.toString()}
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
`;
        log4js_1.Logger.info(logFormat);
        response.status(exception.getStatus() || 500).json({
            code: exception.getStatus() || 500,
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            path: request.url,
            msg: exception.message,
        });
    }
};
HttpFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpFilter);
exports.HttpFilter = HttpFilter;
//# sourceMappingURL=http.filter.js.map