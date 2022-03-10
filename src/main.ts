import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpResponseInterceptor } from './interceptor/http-response.interceptor';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AnyExceptionFilter } from './filter/any-exception.filter';
import { HttpFilter } from './filter/http.filter';
import { ValidatePipe } from './pipe/validate.pipe';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { logger } from './utils/log4js';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { env } = process;

  if (env.NODE_ENV === 'production') {
    // CORS配置
    app.enableCors();
    // 安全防范
    app.use(helmet());
    // 日志
    app.use(LoggerMiddleware);
  }

  // 拦截器
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  // 过滤器
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalFilters(new AnyExceptionFilter());
  // 管道
  app.useGlobalPipes(new ValidatePipe());
  // 中间件
  app.use(LoggerMiddleware);

  if (env.NODE_ENV === 'developer') {
    SwaggerModule.setup(
      '/swagger',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle(env.PLATFORM_NAME)
          .setDescription(`${env.PLATFORM_NAME}接口文档`)
          .setVersion(env.SWAGGER_VERSION)
          .addBearerAuth()
          .addServer('/api')
          .build(),
      ),
    );
  }

  // api前缀
  app.setGlobalPrefix('api');

  await app.listen(env.PORT, () => {
    logger.info('App start at http://localhost:' + env.PORT);
    if (env.NODE_ENV === 'developer') {
      logger.info(`Swagger Doc at http://localhost:${env.PORT}/swagger`);
      logger.info(`Swagger JSON at http://localhost:${env.PORT}/swagger-json`);
    }
  });
}
bootstrap();
