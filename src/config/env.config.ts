import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  isDev: process.env.NODE_ENV === 'developer',
  isProd: process.env.NODE_ENV === 'production',
}));
