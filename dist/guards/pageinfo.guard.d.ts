import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
export declare class PageInfoGuard implements CanActivate {
    private reflector?;
    constructor(reflector?: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export declare const PageInfoGuardProvider: {
    provide: string;
    useClass: typeof PageInfoGuard;
};
