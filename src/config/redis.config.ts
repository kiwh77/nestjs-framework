import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PWD,
  ttl: Number(process.env.REDIS_TTL),
}));
