import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AnyExceptionFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): void;
}
