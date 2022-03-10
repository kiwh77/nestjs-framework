import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
declare const ROLE_FLAG: unique symbol;
export declare class AuthGuard implements CanActivate {
    private reflector?;
    constructor(reflector?: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export declare const DEVELOPER = "developer";
export declare const ADMIN = "admin";
export declare const SUPER_ADMIN = "super_admin";
export declare enum CAN_CREATE_ROLE {
    DEVELOPER = "developer",
    ADMIN = "admin"
}
export declare const Role: (role: string | string[]) => import("@nestjs/common").CustomDecorator<typeof ROLE_FLAG>;
export declare const AuthGuardProvider: {
    provide: string;
    useClass: typeof AuthGuard;
};
export {};
