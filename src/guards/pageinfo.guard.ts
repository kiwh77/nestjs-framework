import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { PAGE_INFO_FLAG } from 'src/common/http.decorator';

@Injectable()
export class PageInfoGuard implements CanActivate {
  constructor(private reflector?: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPageInfo = this.reflector.get<boolean>(
      PAGE_INFO_FLAG,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const { page, limit } = request.query;
    if (isPageInfo) {
      const newQuery = {
        page: !page ? 1 : Number(page),
        limit: !limit ? 10 : Number(limit),
        skip: 0,
      };
      newQuery.skip = (newQuery.page - 1) * newQuery.limit;
      request.query = {
        ...request.query,
        ...newQuery,
      };
    }

    return true;
  }
}

export const PageInfoGuardProvider = {
  provide: APP_GUARD,
  useClass: PageInfoGuard,
};
