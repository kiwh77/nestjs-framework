import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Logger } from 'src/utils/log4js';

@Catch(HttpException)
export class HttpFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
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
    Logger.info(logFormat);

    response.status(exception.getStatus() || 500).json({
      code: exception.getStatus() || 500,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      msg: exception.message,
    });
  }
}
