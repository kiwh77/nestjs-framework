"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const http_response_interceptor_1 = require("./interceptor/http-response.interceptor");
const transform_interceptor_1 = require("./interceptor/transform.interceptor");
const any_exception_filter_1 = require("./filter/any-exception.filter");
const http_filter_1 = require("./filter/http.filter");
const validate_pipe_1 = require("./pipe/validate.pipe");
const logger_middleware_1 = require("./middleware/logger.middleware");
const log4js_1 = require("./utils/log4js");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const { env } = process;
    if (env.NODE_ENV === 'production') {
        app.enableCors();
        app.use((0, helmet_1.default)());
        app.use(logger_middleware_1.LoggerMiddleware);
    }
    app.useGlobalInterceptors(new http_response_interceptor_1.HttpResponseInterceptor());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_filter_1.HttpFilter());
    app.useGlobalFilters(new any_exception_filter_1.AnyExceptionFilter());
    app.useGlobalPipes(new validate_pipe_1.ValidatePipe());
    app.use(logger_middleware_1.LoggerMiddleware);
    if (env.NODE_ENV === 'developer') {
        swagger_1.SwaggerModule.setup('/swagger', app, swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
            .setTitle(env.PLATFORM_NAME)
            .setDescription(`${env.PLATFORM_NAME}接口文档`)
            .setVersion(env.SWAGGER_VERSION)
            .addBearerAuth()
            .addServer('/api')
            .build()));
    }
    app.setGlobalPrefix('api');
    await app.listen(env.PORT, () => {
        log4js_1.logger.info('App start at http://localhost:' + env.PORT);
        if (env.NODE_ENV === 'developer') {
            log4js_1.logger.info(`Swagger Doc at http://localhost:${env.PORT}/swagger`);
            log4js_1.logger.info(`Swagger JSON at http://localhost:${env.PORT}/swagger-json`);
        }
    });
}
bootstrap();
//# sourceMappingURL=main.js.map