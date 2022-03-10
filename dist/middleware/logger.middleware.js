"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const log4js_1 = require("../utils/log4js");
function LoggerMiddleware(req, res, next) {
    const code = res.statusCode;
    next();
    const logFormat = `
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  Url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  Status: ${code}
  Params: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    if (code >= 500) {
        log4js_1.Logger.error(logFormat);
    }
    else if (code >= 400) {
        log4js_1.Logger.warn(logFormat);
    }
    else {
        log4js_1.Logger.access(logFormat);
        log4js_1.Logger.log(logFormat);
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map