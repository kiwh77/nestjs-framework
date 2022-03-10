import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export declare const HttpResponseProvider: {
    provide: string;
    useClass: typeof HttpResponseInterceptor;
};
