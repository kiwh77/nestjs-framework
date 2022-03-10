import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'src/utils/log4js';
import * as dayjs from 'dayjs';

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = `
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  URL: ${request.originalUrl}
  Method: ${request.method}
  IP: ${request.ip}
  Status: ${status}
  Response: ${exception.toString()}
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
`;
    Logger.error(logFormat);

    response.status(status || 500).json({
      code: status || 500,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      msg: `${(exception as any).message}`,
    });
  }
}
