import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const isHttp = exception instanceof HttpException;

    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttp ? exception.getResponse() : 'Internal server error';

    res.status(status).json({
      statusCode: status,
      message,
      error: isHttp ? exception.name : 'InternalServerError',
    });
  }
}
