import { RateLimiterGuard } from 'nestjs-rate-limiter';
export declare const LimitGuardProvider: {
    provide: string;
    useClass: typeof RateLimiterGuard;
};
