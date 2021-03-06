"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const log4js_1 = require("../utils/log4js");
const dayjs = require("dayjs");
let AnyExceptionFilter = class AnyExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const logFormat = `
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  URL: ${request.originalUrl}
  Method: ${request.method}
  IP: ${request.ip}
  Status: ${status}
  Response: ${exception.toString()}
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
`;
        log4js_1.Logger.error(logFormat);
        response.status(status || 500).json({
            code: status || 500,
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            path: request.url,
            msg: `${exception.message}`,
        });
    }
};
AnyExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AnyExceptionFilter);
exports.AnyExceptionFilter = AnyExceptionFilter;
//# sourceMappingURL=any-exception.filter.js.map