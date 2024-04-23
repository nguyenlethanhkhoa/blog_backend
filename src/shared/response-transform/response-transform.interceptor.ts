import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ListResponse<T> {
  items: T[];
  total: number;
}

export interface Response<T> {
  statusCode: number;
  message: 'success' | 'failed';
  result: ListResponse<T> | T;
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
        map((data) => {
          if (Array.isArray(data) && data.length == 2) {
            return {
              statusCode: context.switchToHttp().getResponse().statusCode,
              message: 'success',
              result: {
                items: data[0],
                total: data[1]
              }
            }
          }

          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: 'success',
            result: data
          }
        }),
      );
  }
}
