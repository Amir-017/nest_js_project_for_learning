import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.name === 'ValidationError') {
      return response.status(400).json({
        statusCode: 400,
        message: exception.message,
        error: 'Bad Request',
      });
    }

    if (exception.code === 11000) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Duplicate key error: A record with this value already exists.',
        error: 'Bad Request',
      });
    }

    if (exception.name === 'CastError' && exception.kind === 'ObjectId') {
      return response.status(400).json({
        statusCode: 400,
        message: 'Invalid ID format: The provided ID is not a valid ObjectId.',
        error: 'Bad Request',
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      return response.status(status).json({
        statusCode: status,
        message: exceptionResponse['message'] || exception.message,
        error: exceptionResponse['error'] || 'Error',
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    });
  }
}
   