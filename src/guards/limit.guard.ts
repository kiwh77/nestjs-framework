import { APP_GUARD } from '@nestjs/core';

import { RateLimiterGuard } from 'nestjs-rate-limiter';

export const LimitGuardProvider = {
  provide: APP_GUARD,
  useClass: RateLimiterGuard,
};
