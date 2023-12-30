import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UnsupportedServiceMethodException } from '@knighthell-boilerplate-nestjs/common/exceptions/unsupported-service-method/unsupported-service-method.exception';
import { Response } from 'express';
import { Metadata } from '@grpc/grpc-js';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { WsException } from '@nestjs/websockets';

@Catch(UnsupportedServiceMethodException)
export class UnsupportedServiceMethodExceptionFilter
  implements ExceptionFilter<UnsupportedServiceMethodException>
{
  catch(
    exception: UnsupportedServiceMethodException,
    host: ArgumentsHost,
  ): any {
    const contextType = host.getType();

    switch (contextType) {
      case 'http':
        return this.handleHttpContextType(exception, host);
      case 'rpc':
        return this.handleRpcContextType(exception, host);
      case 'ws':
        return this.handleWsContextType(exception, host);
    }
  }

  handleHttpContextType(
    exception: UnsupportedServiceMethodException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(exception.httpStatusCode).json(exception);
  }

  handleRpcContextType(
    exception: UnsupportedServiceMethodException,
    host: ArgumentsHost,
  ) {
    const context = host.switchToRpc();
    const metadata = context.getContext<Metadata>();
    const data = context.getData();

    return throwError(
      () => new RpcException({ code: exception.grpcStatusCode }),
    );
  }

  handleWsContextType(
    exception: UnsupportedServiceMethodException,
    host: ArgumentsHost,
  ) {
    const context = host.switchToWs();

    const client = context.getClient<WebSocket>();

    client.send(
      JSON.stringify({
        event: 'error',
        errorCode: 'UNSUPPORTED_SERVICE_METHOD',
      }),
    );
  }
}
