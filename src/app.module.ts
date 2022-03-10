import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/db.service';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/env.config';
import { PageInfoGuardProvider } from './guards/pageinfo.guard';
import { LimitGuardProvider } from './guards/limit.guard';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    // .env配置读取
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      ignoreEnvFile: false,
      isGlobal: true,
      load: [envConfig],
    }),
    RateLimiterModule.register({
      for: 'Express',
      type: 'Memory',
      points: 1,
      pointsConsumed: 1,
      duration: 1,
      errorMessage: '服务器繁忙，请稍候重试！',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, LimitGuardProvider, PageInfoGuardProvider],
})
export class AppModule {}
