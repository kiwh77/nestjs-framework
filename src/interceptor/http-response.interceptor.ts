import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const isPageInfo = request.query.page && request.query.limit;

    return next.handle().pipe(
      map((data) => {
        const result: any = {
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
      }),
    );
  }
}

export const HttpResponseProvider = {
  provide: APP_INTERCEPTOR,
  useClass: HttpResponseInterceptor,
};
