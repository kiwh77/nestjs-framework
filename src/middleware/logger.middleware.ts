// import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from 'src/utils/log4js';

// @Injectable()
// export default class LoggerMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     const code = res.statusCode;
//     const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
//     next();
//     // 根据状态码，进行日志类型区分
//     if (code >= 500) {
//       Logger.error(logFormat);
//     } else if (code >= 400) {
//       Logger.warn(logFormat);
//     } else {
//       Logger.access(logFormat);
//       Logger.log(logFormat);
//     }
//   }
// }

// // 函数式中间件
export function LoggerMiddleware(req: any, res: any, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
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
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
